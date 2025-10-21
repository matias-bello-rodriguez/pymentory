import { Directive, ElementRef, Input, OnChanges, SimpleChanges, Renderer2 } from '@angular/core';

/**
 * Directiva para resaltar texto en elementos
 * Útil para resultados de búsqueda, términos importantes
 * 
 * Uso:
 * <p pymHighlight [searchTerm]="'Angular'">Angular es un framework</p>
 * <div pymHighlight [searchTerm]="searchQuery" [highlightClass]="'bg-yellow-200'">
 *   Contenido a resaltar
 * </div>
 */
@Directive({
  selector: '[pymHighlight]',
  standalone: true
})
export class HighlightDirective implements OnChanges {
  @Input() searchTerm: string = '';
  @Input() highlightClass: string = 'bg-yellow-200 font-medium';
  @Input() caseSensitive: boolean = false;

  private originalText: string = '';

  constructor(
    private elementRef: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.originalText = this.elementRef.nativeElement.textContent || '';
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['searchTerm'] || changes['highlightClass'] || changes['caseSensitive']) {
      this.updateHighlight();
    }
  }

  private updateHighlight(): void {
    const element = this.elementRef.nativeElement;
    
    // Reset to original text
    if (!this.searchTerm || this.searchTerm.trim() === '') {
      element.innerHTML = this.escapeHtml(this.originalText);
      return;
    }

    const text = this.originalText;
    const term = this.searchTerm.trim();
    
    // Create regex for highlighting
    const flags = this.caseSensitive ? 'g' : 'gi';
    const regex = new RegExp(`(${this.escapeRegex(term)})`, flags);
    
    // Replace matches with highlighted spans
    const highlightedText = text.replace(regex, (match) => {
      return `<span class="${this.highlightClass}">${this.escapeHtml(match)}</span>`;
    });

    element.innerHTML = this.escapeHtml(text).replace(regex, (match) => {
      return `<span class="${this.highlightClass}">${match}</span>`;
    });
  }

  private escapeHtml(text: string): string {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  private escapeRegex(text: string): string {
    return text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}