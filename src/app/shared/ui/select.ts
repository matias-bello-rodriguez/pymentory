import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export interface SelectOption {
  value: any;
  label: string;
  disabled?: boolean;
  group?: string;
}

@Component({
  selector: 'pym-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <!-- Label -->
      <label *ngIf="label" class="pym-label" [for]="selectId">
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <!-- Select Container -->
      <div class="relative">
        <select
          [id]="selectId"
          [disabled]="disabled"
          [value]="value"
          class="pym-select appearance-none pr-10"
          [class.pym-input--error]="hasError"
          [class.pym-input--success]="hasSuccess"
          (change)="onChange($event)"
          (blur)="onBlur()"
          (focus)="onFocus()"
        >
          <option value="" *ngIf="placeholder" disabled>{{ placeholder }}</option>
          
          <ng-container *ngFor="let option of groupedOptions | keyvalue">
            <!-- Group Label -->
            <optgroup *ngIf="option.key !== 'null'" [label]="option.key">
              <option 
                *ngFor="let opt of option.value"
                [value]="opt.value"
                [disabled]="opt.disabled"
              >
                {{ opt.label }}
              </option>
            </optgroup>
            
            <!-- Ungrouped Options -->
            <ng-container *ngIf="option.key === 'null'">
              <option 
                *ngFor="let opt of option.value"
                [value]="opt.value"
                [disabled]="opt.disabled"
              >
                {{ opt.label }}
              </option>
            </ng-container>
          </ng-container>
        </select>

        <!-- Dropdown Arrow -->
        <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg class="w-5 h-5 pym-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
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
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PymSelectComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule]
})
export class PymSelectComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = 'Seleccionar...';
  @Input() options: SelectOption[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() helpText: string = '';
  @Input() errorText: string = '';
  @Input() selectId: string = `pym-select-${Math.random().toString(36).substr(2, 9)}`;

  @Output() valueChange = new EventEmitter<any>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  value: any = '';

  // ControlValueAccessor implementation
  private onChangeCallback = (value: any) => {};
  private onTouchedCallback = () => {};

  writeValue(value: any): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.value = target.value;
    this.onChangeCallback(this.value);
    this.valueChange.emit(this.value);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.onTouchedCallback();
    this.blur.emit();
  }

  get hasError(): boolean {
    return !!this.errorText;
  }

  get hasSuccess(): boolean {
    return !this.hasError && !!this.value;
  }

  get groupedOptions(): { [key: string]: SelectOption[] } {
    const grouped: { [key: string]: SelectOption[] } = {};
    
    this.options.forEach(option => {
      const group = option.group || 'null';
      if (!grouped[group]) {
        grouped[group] = [];
      }
      grouped[group].push(option);
    });

    return grouped;
  }
}