import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

/**
 * Directiva para copiar texto al portapapeles
 * Útil para códigos, enlaces, datos de tablas
 * 
 * Uso:
 * <button pymCopyToClipboard [textToCopy]="data.code" (copied)="onCopied($event)">
 *   Copiar código
 * </button>
 * <span pymCopyToClipboard>Este texto se copiará</span>
 */
@Directive({
  selector: '[pymCopyToClipboard]',
  standalone: true
})
export class CopyToClipboardDirective {
  @Input() textToCopy: string = '';
  @Input() showFeedback: boolean = true;
  @Input() feedbackDuration: number = 2000;
  
  @Output() copied = new EventEmitter<boolean>();
  @Output() copyError = new EventEmitter<Error>();

  constructor(private elementRef: ElementRef<HTMLElement>) {}

  @HostListener('click', ['$event'])
  async onClick(event: Event): Promise<void> {
    event.preventDefault();
    
    const textToCopy = this.getTextToCopy();
    
    try {
      await this.copyToClipboard(textToCopy);
      this.copied.emit(true);
      
      if (this.showFeedback) {
        this.showCopyFeedback();
      }
    } catch (error) {
      this.copyError.emit(error as Error);
      this.copied.emit(false);
    }
  }

  private getTextToCopy(): string {
    if (this.textToCopy) {
      return this.textToCopy;
    }
    
    // If no explicit text, get element text content
    return this.elementRef.nativeElement.textContent?.trim() || '';
  }

  private async copyToClipboard(text: string): Promise<void> {
    if (navigator.clipboard && window.isSecureContext) {
      // Modern clipboard API
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      this.fallbackCopyToClipboard(text);
    }
  }

  private fallbackCopyToClipboard(text: string): void {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.opacity = '0';
    textArea.style.left = '-9999px';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
    } catch (error) {
      throw new Error('Copy command not supported');
    } finally {
      document.body.removeChild(textArea);
    }
  }

  private showCopyFeedback(): void {
    const element = this.elementRef.nativeElement;
    const originalText = element.textContent;
    const originalTitle = element.title;
    
    // Show feedback
    element.title = 'Copiado!';
    if (element.tagName === 'BUTTON' || element.tagName === 'SPAN') {
      element.textContent = 'Copiado!';
    }
    
    // Add visual feedback class
    element.classList.add('pym-copy-success');
    
    // Restore original state
    setTimeout(() => {
      element.title = originalTitle;
      if (originalText) {
        element.textContent = originalText;
      }
      element.classList.remove('pym-copy-success');
    }, this.feedbackDuration);
  }
}