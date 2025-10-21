import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

export interface FooterLink {
  label: string;
  url: string;
  external?: boolean;
}

@Component({
  selector: 'pym-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './footer.html',
  styleUrls: ['./footer.css'],
  standalone: true,
  imports: []
})
export class PymFooterComponent {
  @Input() companyName: string = 'Pymentory';
  @Input() copyrightText: string = 'Todos los derechos reservados.';
  @Input() version: string = '';
  @Input() links: FooterLink[] = [];

  get currentYear(): number {
    return new Date().getFullYear();
  }
}