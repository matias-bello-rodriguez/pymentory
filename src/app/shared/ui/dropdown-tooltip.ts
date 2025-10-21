import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, HostListener } from '@angular/core';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: string;
  disabled?: boolean;
  separator?: boolean;
  danger?: boolean;
  action?: () => void;
}

@Component({
  selector: 'pym-dropdown',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-dropdown">
      <!-- Trigger -->
      <button
        type="button"
        class="pym-btn pym-btn--ghost"
        [class]="triggerClasses"
        (click)="toggle()"
        [disabled]="disabled"
      >
        <ng-content select="[slot=trigger]">
          <span>{{ triggerText }}</span>
          <svg class="w-4 h-4 ml-1 transition-transform" 
               [class.rotate-180]="isOpen"
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </ng-content>
      </button>

      <!-- Dropdown Content -->
      <div 
        *ngIf="isOpen"
        class="pym-dropdown-content"
        [class]="dropdownClasses"
      >
        <ng-container *ngFor="let item of items">
          <!-- Separator -->
          <div *ngIf="item.separator" class="border-t border-gray-200 my-1"></div>
          
          <!-- Menu Item -->
          <button
            *ngIf="!item.separator"
            type="button"
            class="pym-dropdown-item w-full text-left flex items-center gap-2"
            [class.opacity-50]="item.disabled"
            [class.text-red-600]="item.danger"
            [class.cursor-not-allowed]="item.disabled"
            [disabled]="item.disabled"
            (click)="onItemClick(item)"
          >
            <!-- Icon -->
            <svg *ngIf="item.icon" class="w-4 h-4 flex-shrink-0" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(item.icon)"/>
            </svg>
            
            <!-- Label -->
            <span class="flex-1 truncate">{{ item.label }}</span>
          </button>
        </ng-container>

        <!-- Custom Content -->
        <ng-content></ng-content>
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
export class PymDropdownComponent {
  @Input() items: DropdownItem[] = [];
  @Input() triggerText: string = 'Opciones';
  @Input() position: 'left' | 'right' | 'center' = 'left';
  @Input() disabled: boolean = false;
  @Input() closeOnClick: boolean = true;
  @Input() triggerClasses: string = '';

  @Output() itemClick = new EventEmitter<DropdownItem>();
  @Output() toggleChange = new EventEmitter<boolean>();

  isOpen: boolean = false;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    if (!this.isOpen) return;
    
    const target = event.target as HTMLElement;
    const dropdown = target.closest('.pym-dropdown');
    
    if (!dropdown || dropdown !== event.currentTarget) {
      this.close();
    }
  }

  toggle(): void {
    if (this.disabled) return;
    
    this.isOpen = !this.isOpen;
    this.toggleChange.emit(this.isOpen);
  }

  close(): void {
    this.isOpen = false;
    this.toggleChange.emit(this.isOpen);
  }

  onItemClick(item: DropdownItem): void {
    if (item.disabled) return;

    this.itemClick.emit(item);
    
    if (item.action) {
      item.action();
    }

    if (this.closeOnClick) {
      this.close();
    }
  }

  get dropdownClasses(): string {
    const positionClasses = {
      'left': 'left-0',
      'right': 'right-0',
      'center': 'left-1/2 transform -translate-x-1/2'
    };
    
    return `mt-1 ${positionClasses[this.position]}`;
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'edit': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      'delete': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      'view': 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      'copy': 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z',
      'download': 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'logout': 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
      'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z'
    };
    return icons[iconName] || '';
  }
}

@Component({
  selector: 'pym-tooltip',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-tooltip">
      <ng-content></ng-content>
      
      <div 
        class="pym-tooltip-content"
        [class]="tooltipClasses"
        *ngIf="content || hasContentProjection"
      >
        {{ content }}
        <ng-content select="[slot=tooltip]"></ng-content>
        
        <!-- Arrow -->
        <div class="absolute w-2 h-2 bg-gray-800 transform rotate-45" [class]="arrowClasses"></div>
      </div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymTooltipComponent {
  @Input() content: string = '';
  @Input() position: 'top' | 'bottom' | 'left' | 'right' = 'top';
  @Input() delay: number = 500;

  get hasContentProjection(): boolean {
    // This would need to be checked via ViewChild in a real implementation
    return false;
  }

  get tooltipClasses(): string {
    const positionClasses = {
      'top': 'bottom-full left-1/2 transform -translate-x-1/2 mb-2',
      'bottom': 'top-full left-1/2 transform -translate-x-1/2 mt-2',
      'left': 'right-full top-1/2 transform -translate-y-1/2 mr-2',
      'right': 'left-full top-1/2 transform -translate-y-1/2 ml-2'
    };
    
    return positionClasses[this.position];
  }

  get arrowClasses(): string {
    const arrowPositions = {
      'top': 'top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2',
      'bottom': 'bottom-full left-1/2 transform -translate-x-1/2 translate-y-1/2',
      'left': 'left-full top-1/2 transform -translate-y-1/2 -translate-x-1/2',
      'right': 'right-full top-1/2 transform -translate-y-1/2 translate-x-1/2'
    };
    
    return arrowPositions[this.position];
  }
}

@Component({
  selector: 'pym-search',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative">
      <!-- Search Input -->
      <pym-input
        [placeholder]="placeholder"
        [value]="searchTerm"
        prefixIcon="search"
        [clearable]="clearable"
        (valueChange)="onSearchChange($event)"
        (enterPressed)="onSearch()"
      ></pym-input>

      <!-- Search Results -->
      <div 
        *ngIf="showResults && results.length > 0"
        class="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
      >
        <div 
          *ngFor="let result of results; let i = index"
          class="px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0"
          [class.bg-primary-50]="i === selectedIndex"
          (click)="selectResult(result, i)"
        >
          <!-- Custom Result Template -->
          <ng-container *ngIf="resultTemplate">
            <ng-container [ngTemplateOutlet]="resultTemplate" [ngTemplateOutletContext]="{ $implicit: result, index: i }">
            </ng-container>
          </ng-container>
          
          <!-- Default Result Display -->
          <div *ngIf="!resultTemplate" class="flex items-center gap-2">
            <svg *ngIf="result.icon" class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath(result.icon)"/>
            </svg>
            <span class="flex-1">{{ result.label }}</span>
            <span *ngIf="result.description" class="text-sm text-gray-500">{{ result.description }}</span>
          </div>
        </div>

        <!-- No Results -->
        <div *ngIf="searchTerm && results.length === 0" class="px-4 py-3 text-center text-gray-500">
          No se encontraron resultados
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymSearchComponent {
  @Input() placeholder: string = 'Buscar...';
  @Input() results: SearchResult[] = [];
  @Input() showResults: boolean = false;
  @Input() clearable: boolean = true;
  @Input() resultTemplate?: any; // TemplateRef<any> in real implementation
  @Input() minChars: number = 2;
  @Input() debounceTime: number = 300;

  @Output() search = new EventEmitter<string>();
  @Output() resultSelect = new EventEmitter<SearchResult>();

  searchTerm: string = '';
  selectedIndex: number = -1;

  onSearchChange(term: string): void {
    this.searchTerm = term;
    this.selectedIndex = -1;
    
    if (term.length >= this.minChars) {
      // Debounce logic would go here
      this.search.emit(term);
    }
  }

  onSearch(): void {
    if (this.selectedIndex >= 0 && this.results[this.selectedIndex]) {
      this.selectResult(this.results[this.selectedIndex], this.selectedIndex);
    } else {
      this.search.emit(this.searchTerm);
    }
  }

  selectResult(result: SearchResult, index: number): void {
    this.selectedIndex = index;
    this.resultSelect.emit(result);
  }

  getIconPath(iconName: string): string {
    const icons: { [key: string]: string } = {
      'file': 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      'folder': 'M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z',
      'user': 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      'tag': 'M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z'
    };
    return icons[iconName] || '';
  }
}

export interface SearchResult {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  data?: any;
}