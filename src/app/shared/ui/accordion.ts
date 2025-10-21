

import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface AccordionItem {
  id: string;
  title: string;
  content?: string;
  expanded?: boolean;
  disabled?: boolean;
  icon?: string;
}

@Component({
  selector: 'pym-accordion',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-accordion">
      <div 
        *ngFor="let item of items" 
        class="pym-accordion-item"
        [class.opacity-50]="item.disabled"
      >
        <!-- Header -->
        <button
          type="button"
          class="pym-accordion-header w-full"
          [disabled]="item.disabled"
          (click)="toggle(item)"
        >
          <div class="flex items-center gap-3">
            <!-- Icon -->
            <svg *ngIf="item.icon" class="w-5 h-5 flex-shrink-0" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(item.icon)"/>
            </svg>
            
            <!-- Title -->
            <span class="font-medium text-left">{{ item.title }}</span>
          </div>
          
          <!-- Expand Icon -->
          <svg 
            class="w-5 h-5 transition-transform duration-200"
            [class.rotate-180]="item.expanded"
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>

        <!-- Content -->
        <div 
          *ngIf="item.expanded"
          class="pym-accordion-content"
        >
          <p *ngIf="item.content">{{ item.content }}</p>
          <ng-content [attr.data-accordion-id]="item.id"></ng-content>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .rotate-180 {
      transform: rotate(180deg);
    }
  `],
  standalone: true,
  imports: []
})
export class PymAccordionComponent {
  @Input() items: AccordionItem[] = [];
  @Input() allowMultiple: boolean = false;
  
  @Output() itemToggle = new EventEmitter<AccordionItem>();

  toggle(item: AccordionItem): void {
    if (item.disabled) return;

    if (!this.allowMultiple) {
      // Close all other items
      this.items.forEach(i => {
        if (i.id !== item.id) {
          i.expanded = false;
        }
      });
    }

    item.expanded = !item.expanded;
    this.itemToggle.emit(item);
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'folder': 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      'document': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z'
    };
    return icons[iconName] || icons['folder'];
  }
}