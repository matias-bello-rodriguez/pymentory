import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface BreadcrumbItem {
  label: string;
  route?: string;
  active?: boolean;
}

@Component({
  selector: 'pym-breadcrumb',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="pym-breadcrumb" aria-label="Breadcrumb">
      <ol class="flex items-center gap-1">
        <li *ngFor="let item of items; let i = index; let isLast = last" class="flex items-center">
          <a 
            *ngIf="!isLast && item.route"
            [href]="item.route"
            class="pym-text-muted hover:pym-text-primary transition-colors"
            (click)="onItemClick(item, $event)"
          >
            {{ item.label }}
          </a>
          
          <span 
            *ngIf="!isLast && !item.route"
            class="pym-text-muted"
          >
            {{ item.label }}
          </span>
          
          <span 
            *ngIf="isLast"
            class="font-medium text-gray-900"
            aria-current="page"
          >
            {{ item.label }}
          </span>
          
          <!-- Separator -->
          <span 
            *ngIf="!isLast" 
            class="pym-breadcrumb-separator pym-text-muted"
            aria-hidden="true"
          ></span>
        </li>
      </ol>
    </nav>
  `,
  standalone: true,
  imports: []
})
export class PymBreadcrumbComponent {
  @Input() items: BreadcrumbItem[] = [];
  @Output() itemClick = new EventEmitter<BreadcrumbItem>();

  onItemClick(item: BreadcrumbItem, event: Event): void {
    this.itemClick.emit(item);
  }
}