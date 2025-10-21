import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pym-textarea',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="form-field">
      <!-- Label -->
      <label *ngIf="label" class="pym-label" [for]="textareaId">
        {{ label }}
        <span *ngIf="required" class="text-red-500 ml-1">*</span>
      </label>

      <!-- Textarea -->
      <textarea
        [id]="textareaId"
        [placeholder]="placeholder"
        [disabled]="disabled"
        [readonly]="readonly"
        [attr.maxlength]="maxLength"
        [rows]="rows"
        [value]="value"
        class="pym-input resize-none"
        [class.pym-input--error]="hasError"
        [class.pym-input--success]="hasSuccess"
        [class.resize-y]="resizable"
        (input)="onInput($event)"
        (blur)="onBlur()"
        (focus)="onFocus()"
      ></textarea>

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
      useExisting: forwardRef(() => PymTextareaComponent),
      multi: true
    }
  ],
  standalone: true,
  imports: [CommonModule]
})
export class PymTextareaComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() disabled: boolean = false;
  @Input() readonly: boolean = false;
  @Input() required: boolean = false;
  @Input() maxLength: number | null = null;
  @Input() rows: number = 3;
  @Input() resizable: boolean = true;
  @Input() helpText: string = '';
  @Input() errorText: string = '';
  @Input() showCharCount: boolean = false;
  @Input() textareaId: string = `pym-textarea-${Math.random().toString(36).substr(2, 9)}`;

  @Output() valueChange = new EventEmitter<string>();
  @Output() focus = new EventEmitter<void>();
  @Output() blur = new EventEmitter<void>();

  value: string = '';

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
    const target = event.target as HTMLTextAreaElement;
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

  get hasError(): boolean {
    return !!this.errorText;
  }

  get hasSuccess(): boolean {
    return !this.hasError && !!this.value;
  }
}