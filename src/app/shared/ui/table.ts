import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PymPaginationComponent } from './pagination';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  type?: 'text' | 'number' | 'date' | 'boolean' | 'currency' | 'custom';
  format?: string;
  template?: TemplateRef<any>;
}

export interface TableAction {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'danger' | 'warning';
  disabled?: (row: any) => boolean;
  visible?: (row: any) => boolean;
  action: (row: any) => void;
}

export interface SortState {
  column: string;
  direction: 'asc' | 'desc' | null;
}

@Component({
  selector: 'pym-table',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-table-container">
      <!-- Table Header Actions -->
      <div class="flex justify-between items-center mb-4" *ngIf="showHeader">
        <div class="flex items-center gap-4">
          <h3 *ngIf="title" class="text-lg font-semibold">{{ title }}</h3>
          <span *ngIf="showTotal" class="text-sm pym-text-muted">
            {{ totalItems }} registros
          </span>
        </div>
        
        <div class="flex items-center gap-2">
          <!-- Search -->
          <div class="relative" *ngIf="searchable">
            <input
              type="text"
              placeholder="Buscar..."
              class="pym-input pl-10 w-64"
              [(ngModel)]="searchTerm"
              (input)="onSearch()"
            />
            <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 pym-text-muted" 
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
          </div>

          <!-- Actions -->
          <ng-content select="[slot=actions]"></ng-content>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="pym-table">
          <!-- Header -->
          <thead>
            <tr>
              <!-- Select All Checkbox -->
              <th *ngIf="selectable" class="w-12">
                <input
                  type="checkbox"
                  class="pym-checkbox"
                  [checked]="isAllSelected"
                  [indeterminate]="isSomeSelected"
                  (change)="toggleSelectAll()"
                />
              </th>

              <!-- Columns -->
              <th 
                *ngFor="let column of columns"
                [style.width]="column.width"
                [class.cursor-pointer]="column.sortable"
                (click)="onSort(column)"
              >
                <div class="flex items-center justify-between">
                  <span>{{ column.label }}</span>
                  
                  <!-- Sort Icon -->
                  <div *ngIf="column.sortable" class="flex flex-col ml-2">
                    <svg class="w-3 h-3" 
                         [class.text-primary-500]="sortState.column === column.key && sortState.direction === 'asc'"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7"/>
                    </svg>
                    <svg class="w-3 h-3 -mt-1" 
                         [class.text-primary-500]="sortState.column === column.key && sortState.direction === 'desc'"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </th>

              <!-- Actions Column -->
              <th *ngIf="rowActions.length > 0" class="w-32">Acciones</th>
            </tr>
          </thead>

          <!-- Body -->
          <tbody>
            <tr *ngFor="let row of displayData; let i = index; trackBy: trackByFn">
              <!-- Select Checkbox -->
              <td *ngIf="selectable">
                <input
                  type="checkbox"
                  class="pym-checkbox"
                  [checked]="isRowSelected(row)"
                  (change)="toggleRowSelection(row)"
                />
              </td>

              <!-- Data Columns -->
              <td *ngFor="let column of columns">
                <!-- Custom Template -->
                <ng-container *ngIf="column.template">
                  <ng-container [ngTemplateOutlet]="column.template" 
                                [ngTemplateOutletContext]="{ $implicit: row, column: column, value: getCellValue(row, column.key) }">
                  </ng-container>
                </ng-container>
                
                <!-- Default Cell Content -->
                <span *ngIf="!column.template">
                  {{ formatCellValue(getCellValue(row, column.key), column) }}
                </span>
              </td>

              <!-- Row Actions -->
              <td *ngIf="rowActions.length > 0">
                <div class="flex gap-1">
                  <button
                    *ngFor="let action of getVisibleActions(row)"
                    type="button"
                    class="pym-btn pym-btn--ghost p-1"
                    [disabled]="isActionDisabled(action, row)"
                    [title]="action.label"
                    (click)="onActionClick(action, row)"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getActionIconPath(action.icon)"/>
                    </svg>
                  </button>
                </div>
              </td>
            </tr>

            <!-- Empty State -->
            <tr *ngIf="displayData.length === 0">
              <td [attr.colspan]="getTotalColumns()" class="text-center py-8 pym-text-muted">
                <div class="flex flex-col items-center gap-2">
                  <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                          d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7"/>
                  </svg>
                  <span>{{ emptyMessage }}</span>
                </div>
              </td>
            </tr>

            <!-- Loading State -->
            <tr *ngIf="loading">
              <td [attr.colspan]="getTotalColumns()" class="text-center py-8">
                <div class="flex items-center justify-center gap-2">
                  <div class="pym-spinner"></div>
                  <span class="pym-text-muted">Cargando...</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Footer -->
      <div class="flex justify-between items-center mt-4" *ngIf="paginated || showFooter">
        <!-- Selected Count -->
        <div *ngIf="selectable && selectedRows.length > 0" class="text-sm pym-text-muted">
          {{ selectedRows.length }} elemento(s) seleccionado(s)
        </div>
        
        <!-- Pagination -->
        <pym-pagination
          *ngIf="paginated"
          [currentPage]="currentPage"
          [totalPages]="totalPages"
          [totalItems]="totalItems"
          [pageSize]="pageSize"
          (pageChange)="onPageChange($event)"
          (pageSizeChange)="onPageSizeChange($event)"
        ></pym-pagination>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule, PymPaginationComponent]
})
export class PymTableComponent {
  @Input() title: string = '';
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;
  @Input() selectable: boolean = false;
  @Input() searchable: boolean = true;
  @Input() paginated: boolean = true;
  @Input() pageSize: number = 10;
  @Input() currentPage: number = 1;
  @Input() totalItems: number = 0;
  @Input() rowActions: TableAction[] = [];
  @Input() emptyMessage: string = 'No hay datos para mostrar';
  @Input() showHeader: boolean = true;
  @Input() showFooter: boolean = true;
  @Input() showTotal: boolean = true;

  @Output() sortChange = new EventEmitter<SortState>();
  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<any[]>();
  @Output() rowClick = new EventEmitter<any>();

  searchTerm: string = '';
  sortState: SortState = { column: '', direction: null };
  selectedRows: any[] = [];

  get displayData(): any[] {
    if (this.loading) return [];
    
    let result = [...this.data];
    
    // Apply search filter
    if (this.searchTerm && this.searchable) {
      result = result.filter(row => 
        this.columns.some(column => 
          this.getCellValue(row, column.key)?.toString().toLowerCase().includes(this.searchTerm.toLowerCase())
        )
      );
    }

    // Apply sorting
    if (this.sortState.column && this.sortState.direction) {
      result.sort((a, b) => {
        const aValue = this.getCellValue(a, this.sortState.column);
        const bValue = this.getCellValue(b, this.sortState.column);
        
        if (aValue < bValue) return this.sortState.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return this.sortState.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get isAllSelected(): boolean {
    return this.data.length > 0 && this.selectedRows.length === this.data.length;
  }

  get isSomeSelected(): boolean {
    return this.selectedRows.length > 0 && this.selectedRows.length < this.data.length;
  }

  onSort(column: TableColumn): void {
    if (!column.sortable) return;

    if (this.sortState.column === column.key) {
      // Toggle direction
      if (this.sortState.direction === 'asc') {
        this.sortState.direction = 'desc';
      } else if (this.sortState.direction === 'desc') {
        this.sortState.direction = null;
        this.sortState.column = '';
      } else {
        this.sortState.direction = 'asc';
      }
    } else {
      this.sortState.column = column.key;
      this.sortState.direction = 'asc';
    }

    this.sortChange.emit(this.sortState);
  }

  onSearch(): void {
    this.searchChange.emit(this.searchTerm);
  }

  onPageChange(page: number): void {
    this.currentPage = page;
    this.pageChange.emit(page);
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageSizeChange.emit(size);
  }

  toggleSelectAll(): void {
    if (this.isAllSelected) {
      this.selectedRows = [];
    } else {
      this.selectedRows = [...this.data];
    }
    this.selectionChange.emit(this.selectedRows);
  }

  toggleRowSelection(row: any): void {
    const index = this.selectedRows.findIndex(r => r === row);
    if (index >= 0) {
      this.selectedRows.splice(index, 1);
    } else {
      this.selectedRows.push(row);
    }
    this.selectionChange.emit(this.selectedRows);
  }

  isRowSelected(row: any): boolean {
    return this.selectedRows.includes(row);
  }

  getCellValue(row: any, key: string): any {
    return key.split('.').reduce((obj, prop) => obj?.[prop], row);
  }

  formatCellValue(value: any, column: TableColumn): string {
    if (value == null) return '';

    switch (column.type) {
      case 'currency':
        return new Intl.NumberFormat('es-CL', { 
          style: 'currency', 
          currency: 'CLP' 
        }).format(value);
      
      case 'number':
        return new Intl.NumberFormat('es-CL').format(value);
      
      case 'date':
        return new Intl.DateTimeFormat('es-CL').format(new Date(value));
      
      case 'boolean':
        return value ? 'Sí' : 'No';
      
      default:
        return value.toString();
    }
  }

  getVisibleActions(row: any): TableAction[] {
    return this.rowActions.filter(action => 
      !action.visible || action.visible(row)
    );
  }

  isActionDisabled(action: TableAction, row: any): boolean {
    return action.disabled ? action.disabled(row) : false;
  }

  onActionClick(action: TableAction, row: any): void {
    action.action(row);
  }

  getTotalColumns(): number {
    let total = this.columns.length;
    if (this.selectable) total++;
    if (this.rowActions.length > 0) total++;
    return total;
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getActionIconPath(iconName: string = 'edit'): string {
    const icons: { [key: string]: string } = {
      'edit': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      'delete': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      'view': 'M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z',
      'copy': 'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
    };
    return icons[iconName] || icons['edit'];
  }
}