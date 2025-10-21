import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'pym-switch',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <label class="flex items-center justify-between cursor-pointer" [class.opacity-50]="disabled">
        <!-- Label and Description -->
        <div class="flex-1 min-w-0 mr-4">
          <div class="text-sm font-medium text-gray-900" *ngIf="label">
            {{ label }}
            <span *ngIf="required" class="text-red-500 ml-1">*</span>
          </div>
          <p *ngIf="description" class="text-sm pym-text-muted mt-1">
            {{ description }}
          </p>
        </div>

        <!-- Switch -->
        <div class="relative">
          <input
            type="checkbox"
            [id]="switchId"
            [checked]="checked"
            [disabled]="disabled"
            class="sr-only"
            (change)="onToggle($event)"
            (blur)="onBlur()"
            (focus)="onFocus()"
          />
          <div 
            class="pym-switch"
            [class.pym-switch--active]="checked"
            [class.opacity-50]="disabled"
          ></div>
        </div>
      </label>

      <!-- Error Text -->
      <p *ngIf="errorText" class="mt-1 text-sm pym-danger">
        {{ errorText }}
      </p>
    </div>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PymSwitchComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: []
})
export class PymSwitchComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() disabled: boolean = false;
  @Input() required: boolean = false;
  @Input() errorText: string = '';
  @Input() switchId: string = `pym-switch-${Math.random().toString(36).substr(2, 9)}`;

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