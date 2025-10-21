import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pym-pagination',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="pym-pagination">
      <!-- Page Size Selector -->
      <div class="flex items-center gap-2 mr-4" *ngIf="showPageSize">
        <label class="text-sm pym-text-muted">Mostrar:</label>
        <select 
          class="pym-select text-sm"
          [value]="pageSize"
          (change)="onPageSizeChange($event)"
        >
          <option *ngFor="let size of pageSizeOptions" [value]="size">{{ size }}</option>
        </select>
        <span class="text-sm pym-text-muted">por página</span>
      </div>

      <!-- Page Info -->
      <div class="text-sm pym-text-muted mr-4" *ngIf="showInfo">
        {{ getStartItem() }}-{{ getEndItem() }} de {{ totalItems }} elementos
      </div>

      <!-- Navigation -->
      <div class="flex gap-1">
        <!-- First Page -->
        <button
          class="pym-pagination-item"
          [disabled]="currentPage === 1"
          (click)="goToPage(1)"
          title="Primera página"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Previous Page -->
        <button
          class="pym-pagination-item"
          [disabled]="currentPage === 1"
          (click)="goToPage(currentPage - 1)"
          title="Página anterior"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
          </svg>
        </button>

        <!-- Page Numbers -->
        <button
          *ngFor="let page of getVisiblePages()"
          class="pym-pagination-item"
          [class.pym-pagination-item--active]="page === currentPage"
          [disabled]="page === '...'"
          (click)="goToPage(page)"
        >
          {{ page }}
        </button>

        <!-- Next Page -->
        <button
          class="pym-pagination-item"
          [disabled]="currentPage === totalPages"
          (click)="goToPage(currentPage + 1)"
          title="Página siguiente"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
          </svg>
        </button>

        <!-- Last Page -->
        <button
          class="pym-pagination-item"
          [disabled]="currentPage === totalPages"
          (click)="goToPage(totalPages)"
          title="Última página"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
          </svg>
        </button>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class PymPaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() totalItems: number = 0;
  @Input() pageSize: number = 10;
  @Input() pageSizeOptions: number[] = [10, 25, 50, 100];
  @Input() maxVisiblePages: number = 5;
  @Input() showPageSize: boolean = true;
  @Input() showInfo: boolean = true;

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();

  goToPage(page: number | string): void {
    if (typeof page === 'string' || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.pageChange.emit(page);
  }

  onPageSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const newSize = parseInt(target.value, 10);
    this.pageSizeChange.emit(newSize);
  }

  getVisiblePages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const half = Math.floor(this.maxVisiblePages / 2);

    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxVisiblePages - 1);

    // Adjust start if we're near the end
    if (end === this.totalPages) {
      start = Math.max(1, end - this.maxVisiblePages + 1);
    }

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(1);
      if (start > 2) {
        pages.push('...');
      }
    }

    // Add visible pages
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // Add ellipsis and last page if needed
    if (end < this.totalPages) {
      if (end < this.totalPages - 1) {
        pages.push('...');
      }
      pages.push(this.totalPages);
    }

    return pages;
  }

  getStartItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  getEndItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalItems);
  }
}