import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pym-input',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <!-- Label -->
      <label *ngIf="label" class="pym-label" [for]="inputId">
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <!-- Input Container -->
      <div class="relative">
        <!-- Prefix Icon -->
        <div *ngIf="prefixIcon" class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="w-5 h-5 pym-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(prefixIcon)"/>
          </svg>
        </div>

        <!-- Input -->
        <input
          [id]="inputId"
          [type]="type"
          [placeholder]="placeholder"
          [disabled]="disabled"
          [readonly]="readonly"
          [attr.maxlength]="maxLength"
          [min]="min"
          [max]="max"
          [step]="step"
          [value]="value"
          class="pym-input"
          [class.pl-10]="prefixIcon"
          [class.pr-10]="suffixIcon || clearable"
          [class.pym-input--error]="hasError"
          [class.pym-input--success]="hasSuccess"
          (input)="onInput($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
          (keyup.enter)="onEnter()"
        />

        <!-- Suffix Icon or Clear Button -->
        <div *ngIf="suffixIcon || (clearable && value)" class="absolute inset-y-0 right-0 pr-3 flex items-center">
          <!-- Clear Button -->
          <button
            *ngIf="clearable && value && !disabled"
            type="button"
            class="text-gray-400 hover:text-gray-600"
            (click)="clear()"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
          
          <!-- Suffix Icon -->
          <svg *ngIf="suffixIcon" class="w-5 h-5 pym-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(suffixIcon)"/>
          </svg>
        </div>
      </div>

      <!-- Help Text -->
      <p *ngIf="helpText && !errorText" class="mt-1 text-sm pym-text-muted">
        {{ helpText }}
      </p>

      <!-- Error Text -->
      <p *ngIf="errorText" class="mt-1 text-sm pym-danger">
        {{ errorText }}
      </p>

      <!-- Character Count -->
      <p *ngIf="maxLength && showCharCount" class="mt-1 text-xs pym-text-muted text-right">
        {{ value?.length || 0 }}/{{ maxLength }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PymInputComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule]
})
export class PymInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() min: number | string | null = null;
  @Input() max: number | string | null = null;
  @Input() step: number | string | null = null;
  @Input() prefixIcon: string = '';
  @Input() suffixIcon: string = '';
  @Input() clearable: boolean = false;
  @Input() helpText: string = '';
  @Input() errorText: string = '';
  @Input() showCharCount: boolean = false;
  @Input() inputId: string = `pym-input-${Math.random().toString(36).substr(2, 9)}`;

  @Output() valueChange = new EventEmitter<string>();
  @Output() enterPressed = new EventEmitter<void>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  @Input() value: string = '';

  // ControlValueAccessor implementation
  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.value = target.value;
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }

  onEnter(): void {
    this.enterPressed.emit();
  }

  clear(): void {
    this.value = '';
    this.onChange(this.value);
    this.valueChange.emit(this.value);
  }

  get hasError(): boolean {
    return !!this.errorText;
  }

  get hasSuccess(): boolean {
    return !this.hasError && !!this.value;
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      'email': 'M3 8l7.89 7.89a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
      'phone': 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z',
      'lock': 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
      'calendar': 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z'
    };
    return icons[iconName] || '';
  }
}