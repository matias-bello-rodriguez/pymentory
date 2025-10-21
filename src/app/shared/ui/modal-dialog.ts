import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PymButtonComponent } from './button';

@Component({
  selector: 'pym-modal',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      *ngIf="isOpen"
      class="pym-modal-overlay"
      (click)="onOverlayClick($event)"
    >
      <div 
        class="pym-modal"
        [class]="modalClasses"
        (click)="$event.stopPropagation()"
      >
        <!-- Header -->
        <div *ngIf="title || showCloseButton" class="flex items-center justify-between pb-4 border-b border-gray-200">
          <h3 *ngIf="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <button
            *ngIf="showCloseButton"
            type="button"
            class="text-gray-400 hover:text-gray-600 p-1"
            (click)="close()"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Content -->
        <div class="py-4">
          <ng-content></ng-content>
        </div>

        <!-- Footer -->
        <div *ngIf="hasFooter" class="flex justify-end gap-2 pt-4 border-t border-gray-200">
          <ng-content select="[slot=footer]"></ng-content>
          
          <!-- Default Footer Buttons -->
          <div *ngIf="showDefaultFooter" class="flex gap-2">
            <pym-button
              *ngIf="showCancelButton"
              variant="outline"
              (click)="cancel()"
            >
              {{ cancelText }}
            </pym-button>
            <pym-button
              *ngIf="showConfirmButton"
              [variant]="confirmVariant"
              [loading]="loading"
              (click)="confirm()"
            >
              {{ confirmText }}
            </pym-button>
          </div>
        </div>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, PymButtonComponent]
})
export class PymModalComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() size: 'sm' | 'md' | 'lg' | 'xl' | 'full' = 'md';
  @Input() closable: boolean = true;
  @Input() showCloseButton: boolean = true;
  @Input() closeOnOverlayClick: boolean = true;
  @Input() loading: boolean = false;
  
  // Footer options
  @Input() hasFooter: boolean = false;
  @Input() showDefaultFooter: boolean = false;
  @Input() showCancelButton: boolean = true;
  @Input() showConfirmButton: boolean = true;
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmText: string = 'Confirmar';
  @Input() confirmVariant: 'primary' | 'danger' | 'success' | 'warning' = 'primary';

  @Output() modalClose = new EventEmitter<void>();
  @Output() modalCancel = new EventEmitter<void>();
  @Output() modalConfirm = new EventEmitter<void>();

  get modalClasses(): string {
    const sizeClasses = {
      'sm': 'max-w-md',
      'md': 'max-w-lg',
      'lg': 'max-w-2xl',
      'xl': 'max-w-4xl',
      'full': 'max-w-full mx-4'
    };
    
    return sizeClasses[this.size] || sizeClasses['md'];
  }

  onOverlayClick(event: Event): void {
    if (this.closeOnOverlayClick && this.closable) {
      this.close();
    }
  }

  close(): void {
    if (this.closable) {
      this.modalClose.emit();
    }
  }

  cancel(): void {
    this.modalCancel.emit();
  }

  confirm(): void {
    this.modalConfirm.emit();
  }
}

@Component({
  selector: 'pym-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <pym-modal
      [isOpen]="isOpen"
      [title]="title"
      [size]="size"
      [closable]="closable"
      [loading]="loading"
      [hasFooter]="true"
      [showDefaultFooter]="true"
      [cancelText]="cancelText"
      [confirmText]="confirmText"
      [confirmVariant]="type"
      (modalClose)="onClose()"
      (modalCancel)="onCancel()"
      (modalConfirm)="onConfirm()"
    >
      <!-- Icon -->
      <div class="flex items-start gap-4" *ngIf="showIcon">
        <div class="flex-shrink-0">
          <div 
            class="w-12 h-12 rounded-full flex items-center justify-center"
            [class]="getIconClasses()"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
            </svg>
          </div>
        </div>
        
        <div class="flex-1">
          <h4 *ngIf="subtitle" class="text-base font-medium text-gray-900 mb-2">{{ subtitle }}</h4>
          <p class="text-sm text-gray-600">
            <ng-content></ng-content>
          </p>
        </div>
      </div>

      <!-- Without Icon -->
      <div *ngIf="!showIcon">
        <h4 *ngIf="subtitle" class="text-base font-medium text-gray-900 mb-2">{{ subtitle }}</h4>
        <p class="text-sm text-gray-600">
          <ng-content></ng-content>
        </p>
      </div>
    </pym-modal>
  `,
  standalone: true,
  imports: [PymModalComponent]
})
export class PymDialogComponent {
  @Input() isOpen: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() type: 'primary' | 'danger' | 'warning' | 'success' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'sm';
  @Input() closable: boolean = true;
  @Input() showIcon: boolean = true;
  @Input() loading: boolean = false;
  @Input() cancelText: string = 'Cancelar';
  @Input() confirmText: string = 'Confirmar';

  @Output() dialogClose = new EventEmitter<void>();
  @Output() dialogCancel = new EventEmitter<void>();
  @Output() dialogConfirm = new EventEmitter<void>();

  onClose(): void {
    this.dialogClose.emit();
  }

  onCancel(): void {
    this.dialogCancel.emit();
  }

  onConfirm(): void {
    this.dialogConfirm.emit();
  }

  getIconClasses(): string {
    switch (this.type) {
      case 'danger':
        return 'bg-red-100 text-red-600';
      case 'warning':
        return 'bg-yellow-100 text-yellow-600';
      case 'success':
        return 'bg-green-100 text-green-600';
      default:
        return 'bg-blue-100 text-blue-600';
    }
  }

  getIconPath(): string {
    switch (this.type) {
      case 'danger':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z';
      case 'success':
        return 'M5 13l4 4L19 7';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}