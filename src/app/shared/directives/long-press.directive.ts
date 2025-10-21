import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

/**
 * Directiva para detectar long press (mantener presionado)
 * Útil para acciones especiales en botones, menús contextuales
 * 
 * Uso:
 * <button pymLongPress (longPress)="onLongPress()" [longPressDuration]="800">
 *   Mantener presionado
 * </button>
 */
@Directive({
  selector: '[pymLongPress]',
  standalone: true
})
export class LongPressDirective {
  @Input() longPressDuration: number = 500; // milliseconds
  @Input() disabled: boolean = false;
  
  @Output() longPress = new EventEmitter<Event>();
  @Output() longPressStart = new EventEmitter<Event>();
  @Output() longPressEnd = new EventEmitter<Event>();

  private pressTimer?: number;
  private isLongPress = false;

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('mousedown', ['$event'])
  @HostListener('touchstart', ['$event'])
  onPressStart(event: Event): void {
    if (this.disabled) return;
    
    this.isLongPress = false;
    this.longPressStart.emit(event);
    
    this.pressTimer = window.setTimeout(() => {
      this.isLongPress = true;
      this.longPress.emit(event);
    }, this.longPressDuration);
  }

  @HostListener('mouseup', ['$event'])
  @HostListener('mouseleave', ['$event'])
  @HostListener('touchend', ['$event'])
  @HostListener('touchcancel', ['$event'])
  onPressEnd(event: Event): void {
    if (this.disabled) return;
    
    if (this.pressTimer) {
      clearTimeout(this.pressTimer);
      this.pressTimer = undefined;
    }
    
    this.longPressEnd.emit(event);
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    // Prevent normal click if it was a long press
    if (this.isLongPress) {
      event.preventDefault();
      event.stopPropagation();
    }
  }
}