import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pym-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-white border-t border-gray-200 py-4 px-6">
      <div class="flex flex-col md:flex-row justify-between items-center gap-4">
        <!-- Copyright -->
        <div class="text-sm pym-text-muted">
          © {{ currentYear }} {{ companyName }}. {{ copyrightText }}
        </div>

        <!-- Version -->
        <div class="text-xs pym-text-muted" *ngIf="version">
          Versión {{ version }}
        </div>

        <!-- Links -->
        <div class="flex gap-4" *ngIf="links.length > 0">
          <a 
            *ngFor="let link of links"
            [href]="link.url"
            [target]="link.external ? '_blank' : '_self'"
            class="text-sm pym-text-primary hover:underline"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </footer>
  `,
  standalone: true,
  imports: []
})
export class PymFooterComponent {
  @Input() companyName: string = 'PyVentory';
  @Input() copyrightText: string = 'Todos los derechos reservados.';
  @Input() version: string = '';
  @Input() links: FooterLink[] = [];

  get currentYear(): number {
    return new Date().getFullYear();
  }
}

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}