import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

/**
 * Directiva para detectar clicks fuera del elemento
 * Útil para cerrar modales, dropdowns, etc.
 * 
 * Uso: <div pymClickOutside (clickOutside)="close()">Content</div>
 */
@Directive({
  selector: '[pymClickOutside]',
  standalone: true
})
export class ClickOutsideDirective {
  @Output() clickOutside = new EventEmitter<Event>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const contains = this.elementRef.nativeElement.contains(target);
    
    if (!contains) {
      this.clickOutside.emit(event);
    }
  }
}