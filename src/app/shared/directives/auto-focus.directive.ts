import { Directive, ElementRef, Input, AfterViewInit } from '@angular/core';

/**
 * Directiva para enfocar automáticamente un elemento
 * Útil para formularios, modales, inputs de búsqueda
 * 
 * Uso: 
 * <input pymAutoFocus>
 * <input pymAutoFocus [delay]="500">
 * <input pymAutoFocus [condition]="shouldFocus">
 */
@Directive({
  selector: '[pymAutoFocus]',
  standalone: true
})
export class AutoFocusDirective implements AfterViewInit {
  @Input() delay: number = 0;
  @Input() condition: boolean = true;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    if (!this.condition) return;

    if (this.delay > 0) {
      setTimeout(() => this.focus(), this.delay);
    } else {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => this.focus(), 0);
    }
  }

  private focus(): void {
    const element = this.elementRef.nativeElement;
    if (element && typeof element.focus === 'function') {
      element.focus();
    }
  }
}