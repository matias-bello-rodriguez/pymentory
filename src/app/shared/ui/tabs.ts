import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

export interface TabItem {
  id: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
  icon?: string;
}

@Component({
  selector: 'pym-tabs',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-tabs-container">
      <!-- Tab Headers -->
      <div class="pym-tabs">
        <button
          *ngFor="let tab of tabs"
          type="button"
          class="pym-tab"
          [class.pym-tab--active]="tab.id === activeTabId"
          [disabled]="tab.disabled"
          (click)="selectTab(tab)"
        >
          <!-- Icon -->
          <svg *ngIf="tab.icon" class="w-4 h-4 mr-2" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(tab.icon)"/>
          </svg>
          
          <!-- Label -->
          <span>{{ tab.label }}</span>
          
          <!-- Badge -->
          <span *ngIf="tab.badge" class="ml-2 pym-badge pym-badge--primary">
            {{ tab.badge }}
          </span>
        </button>
      </div>

      <!-- Tab Content -->
      <div class="tab-content py-4">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymTabsComponent {
  @Input() tabs: TabItem[] = [];
  @Input() activeTabId: string = '';
  
  @Output() tabChange = new EventEmitter<TabItem>();

  ngOnInit(): void {
    if (!this.activeTabId && this.tabs.length > 0) {
      this.activeTabId = this.tabs[0].id;
    }
  }

  selectTab(tab: TabItem): void {
    if (tab.disabled) return;
    
    this.activeTabId = tab.id;
    this.tabChange.emit(tab);
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'chart': 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    };
    return icons[iconName] || icons['info'];
  }
}

@Component({
  selector: 'pym-tab-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div *ngIf="active" class="tab-panel">
      <ng-content></ng-content>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymTabPanelComponent {
  @Input() tabId: string = '';
  @Input() active: boolean = false;
}