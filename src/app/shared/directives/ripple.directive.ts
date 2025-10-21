import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Directiva para efecto ripple en botones y elementos clickeables
 * Mejora la UX con feedback visual
 * 
 * Uso: 
 * <button pymRipple>Click me</button>
 * <div pymRipple [rippleColor]="'rgba(255,255,255,0.3)'">Clickeable</div>
 */
@Directive({
  selector: '[pymRipple]',
  standalone: true
})
export class RippleDirective {
  @Input() rippleColor: string = 'rgba(255, 255, 255, 0.3)';
  @Input() rippleDuration: number = 600;

  constructor(private elementRef: ElementRef<HTMLElement>) {
    // Ensure position relative for ripple effect
    const element = this.elementRef.nativeElement;
    const computedStyle = getComputedStyle(element);
    
    if (computedStyle.position === 'static') {
      element.style.position = 'relative';
    }
    
    element.style.overflow = 'hidden';
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    this.createRipple(event);
  }

  private createRipple(event: MouseEvent): void {
    const element = this.elementRef.nativeElement;
    const rect = element.getBoundingClientRect();
    
    // Calculate ripple size and position
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    // Create ripple element
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background-color: ${this.rippleColor};
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      transform: scale(0);
      animation: pym-ripple ${this.rippleDuration}ms linear;
      pointer-events: none;
    `;
    
    // Add CSS animation if not exists
    this.ensureRippleAnimation();
    
    // Add ripple to element
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    }, this.rippleDuration);
  }

  private ensureRippleAnimation(): void {
    const styleId = 'pym-ripple-animation';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes pym-ripple {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}