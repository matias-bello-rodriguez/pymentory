import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pym-checkbox',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <label class="flex items-start gap-3 cursor-pointer" [class.opacity-50]="disabled">
        <!-- Checkbox -->
        <div class="relative flex-shrink-0 mt-1">
          <input
            type="checkbox"
            [id]="checkboxId"
            [checked]="checked"
            [disabled]="disabled"
            [value]="value"
            class="pym-checkbox sr-only"
            (change)="onToggle($event)"
            (blur)="onBlur()"
            (focus)="onFocus()"
          />
          <div 
            class="w-5 h-5 border-2 rounded flex items-center justify-center transition-colors"
            [class.pym-bg-primary]="checked"
            [class.border-primary-500]="checked"
            [class.border-gray-300]="!checked"
          >
            <svg 
              *ngIf="checked" 
              class="w-3 h-3 text-white" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"/>
            </svg>
          </div>
        </div>

        <!-- Label and Description -->
        <div class="flex-1 min-w-0">
          <div class="text-sm font-medium text-gray-900" *ngIf="label">
            {{ label }}
            <span *ngIf="required" class="text-red-500 ml-1">*</span>
          </div>
          <p *ngIf="description" class="text-sm pym-text-muted mt-1">
            {{ description }}
          </p>
        </div>
      </label>

      <!-- Error Text -->
      <p *ngIf="errorText" class="mt-1 text-sm pym-danger ml-8">
        {{ errorText }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PymCheckboxComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: []
})
export class PymCheckboxComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() value: any = true;
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorText: string = '';
  @Input() checkboxId: string = `pym-checkbox-${Math.random().toString(36).substr(2, 9)}`;

  @Output() checkedChange = new EventEmitter<boolean>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  checked: boolean = false;

  // ControlValueAccessor implementation
  private onChange = (value: boolean) => {};
  private onTouched = () => {};

  writeValue(value: boolean): void {
    this.checked = !!value;
  }

  registerOnChange(fn: (value: boolean) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onToggle(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.checked = target.checked;
    this.onChange(this.checked);
    this.checkedChange.emit(this.checked);
  }

  onFocus(): void {
    this.focus.emit();
  }

  onBlur(): void {
    this.onTouched();
    this.blur.emit();
  }
}

@Component({
  selector: 'pym-radio',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <fieldset [disabled]="disabled">
        <legend *ngIf="label" class="pym-label">
          {{ label }}
          <span *ngIf="required" class="text-red-500 ml-1">*</span>
        </legend>
        
        <div class="space-y-2 mt-2">
          <label 
            *ngFor="let option of options" 
            class="flex items-start gap-3 cursor-pointer"
            [class.opacity-50]="disabled || option.disabled"
          >
            <!-- Radio -->
            <div class="relative flex-shrink-0 mt-1">
              <input
                type="radio"
                [name]="radioName"
                [value]="option.value"
                [checked]="value === option.value"
                [disabled]="disabled || option.disabled"
                class="pym-radio sr-only"
                (change)="onSelect(option.value)"
                (blur)="onBlur()"
                (focus)="onFocus()"
              />
              <div 
                class="w-5 h-5 border-2 rounded-full flex items-center justify-center transition-colors"
                [class.pym-bg-primary]="value === option.value"
                [class.border-primary-500]="value === option.value"
                [class.border-gray-300]="value !== option.value"
              >
                <div 
                  *ngIf="value === option.value" 
                  class="w-2 h-2 bg-white rounded-full"
                ></div>
              </div>
            </div>

            <!-- Label and Description -->
            <div class="flex-1 min-w-0">
              <div class="text-sm font-medium text-gray-900">
                {{ option.label }}
              </div>
              <p *ngIf="option.description" class="text-sm pym-text-muted mt-1">
                {{ option.description }}
              </p>
            </div>
          </label>
        </div>
      </fieldset>

      <!-- Error Text -->
      <p *ngIf="errorText" class="mt-1 text-sm pym-danger">
        {{ errorText }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PymRadioComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: []
})
export class PymRadioComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() options: RadioOption[] = [];
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorText: string = '';
  @Input() radioName: string = `pym-radio-${Math.random().toString(36).substr(2, 9)}`;

  @Output() valueChange = new EventEmitter<any>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  value: any = null;

  // ControlValueAccessor implementation
  private onChange = (value: any) => {};
  private onTouched = () => {};

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelect(value: any): void {
    this.value = value;
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
}

export interface RadioOption {
  value: any;
  label: string;
  description?: string;
  disabled?: boolean;
}