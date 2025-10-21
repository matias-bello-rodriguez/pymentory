import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: string;
  route?: string;
  children?: SidebarItem[];
  active?: boolean;
  badge?: string | number;
}

@Component({
  selector: 'pym-sidebar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <aside class="pym-sidebar" [class.collapsed]="collapsed">
      <!-- Header -->
      <div class="p-4 border-b border-gray-200" *ngIf="!collapsed">
        <h2 class="font-semibold text-gray-800">{{ title }}</h2>
      </div>

      <!-- Toggle Button -->
      <button 
        *ngIf="collapsible"
        class="absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-sm z-10"
        (click)="toggleCollapse()"
      >
        <svg class="w-4 h-4 text-gray-600" 
             [class.rotate-180]="collapsed"
             fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
        </svg>
      </button>

      <!-- Navigation -->
      <nav class="flex-1 p-2">
        <ul class="space-y-1">
          <li *ngFor="let item of items">
            <div>
              <!-- Main Item -->
              <a 
                [href]="item.route || '#'"
                class="pym-sidebar-item group"
                [class.pym-sidebar-item--active]="item.active"
                (click)="onItemClick(item, $event)"
              >
                <!-- Icon -->
                <svg *ngIf="item.icon" class="w-5 h-5 flex-shrink-0" 
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(item.icon)"/>
                </svg>
                
                <!-- Label -->
                <span *ngIf="!collapsed" class="flex-1 truncate">{{ item.label }}</span>
                
                <!-- Badge -->
                <span *ngIf="item.badge && !collapsed" class="pym-badge pym-badge--primary ml-auto">
                  {{ item.badge }}
                </span>
                
                <!-- Expand Arrow -->
                <svg *ngIf="item.children && !collapsed" 
                     class="w-4 h-4 flex-shrink-0 transition-transform"
                     [class.rotate-90]="item.active"
                     fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </a>

              <!-- Submenu -->
              <ul *ngIf="item.children && item.active && !collapsed" 
                  class="ml-6 mt-1 space-y-1">
                <li *ngFor="let child of item.children">
                  <a 
                    [href]="child.route || '#'"
                    class="pym-sidebar-item text-sm"
                    [class.pym-sidebar-item--active]="child.active"
                    (click)="onItemClick(child, $event)"
                  >
                    <span class="truncate">{{ child.label }}</span>
                    <span *ngIf="child.badge" class="pym-badge pym-badge--primary ml-auto">
                      {{ child.badge }}
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </nav>

      <!-- Footer -->
      <div class="p-4 border-t border-gray-200" *ngIf="showFooter && !collapsed">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </aside>
  `,
  styles: [`
    .collapsed {
      width: 4rem;
    }
    
    .collapsed .pym-sidebar-item {
      justify-content: center;
      padding: 0.75rem;
    }
    
    .rotate-90 {
      transform: rotate(90deg);
    }
    
    .rotate-180 {
      transform: rotate(180deg);
    }
  `],
  standalone: true,
  imports: []
})
export class PymSidebarComponent {
  @Input() title: string = 'Navegación';
  @Input() items: SidebarItem[] = [];
  @Input() collapsed: boolean = false;
  @Input() collapsible: boolean = true;
  @Input() showFooter: boolean = true;

  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() collapseToggle = new EventEmitter<boolean>();

  onItemClick(item: SidebarItem, event: Event): void {
    if (item.children && item.children.length > 0) {
      event.preventDefault();
      // Toggle expansion
      item.active = !item.active;
    }
    this.itemClick.emit(item);
  }

  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.collapseToggle.emit(this.collapsed);
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'dashboard': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
      'inventory': 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M9 5l7 7-7 7',
      'sales': 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      'purchases': 'M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h1m-1-7a1 1 0 100 2 1 1 0 000-2z',
      'reports': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'users': 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z'
    };
    return icons[iconName] || icons['dashboard'];
  }
}