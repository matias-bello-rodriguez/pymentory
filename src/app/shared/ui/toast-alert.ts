import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  duration?: number;
  persistent?: boolean;
  actions?: ToastAction[];
}

export interface ToastAction {
  label: string;
  action: () => void;
}

@Component({
  selector: 'pym-toast',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="pym-toast"
      [class]="getToastClasses()"
      [style.animation-duration]="animationDuration"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 *ngIf="toast.title" class="font-medium">{{ toast.title }}</h4>
        <p class="text-sm" [class.mt-1]="toast.title">{{ toast.message }}</p>
        
        <!-- Actions -->
        <div *ngIf="toast.actions && toast.actions.length > 0" class="mt-2 flex gap-2">
          <button
            *ngFor="let action of toast.actions"
            type="button"
            class="text-sm underline hover:no-underline"
            (click)="onActionClick(action)"
          >
            {{ action.label }}
          </button>
        </div>
      </div>

      <!-- Close Button -->
      <button
        *ngIf="!toast.persistent"
        type="button"
        class="flex-shrink-0 ml-2 text-white/80 hover:text-white"
        (click)="close()"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <!-- Progress Bar -->
      <div 
        *ngIf="showProgress && !toast.persistent"
        class="absolute bottom-0 left-0 h-1 bg-white/30 transition-all ease-linear"
        [style.width.%]="progressPercent"
      ></div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: relative;
      margin-bottom: 0.5rem;
    }
    
    .pym-toast {
      position: relative;
      overflow: hidden;
    }
  `],
  standalone: true,
  imports: []
})
export class PymToastComponent {
  @Input() toast!: Toast;
  @Input() showProgress: boolean = true;
  @Input() animationDuration: string = '300ms';

  @Output() closeToast = new EventEmitter<string>();

  progressPercent: number = 100;
  private progressTimer?: number;

  ngOnInit(): void {
    if (!this.toast.persistent && this.toast.duration) {
      this.startProgressTimer();
    }
  }

  ngOnDestroy(): void {
    if (this.progressTimer) {
      clearInterval(this.progressTimer);
    }
  }

  close(): void {
    this.closeToast.emit(this.toast.id);
  }

  onActionClick(action: ToastAction): void {
    action.action();
  }

  getToastClasses(): string {
    const baseClasses = 'flex items-start gap-3 p-4 rounded-lg shadow-lg text-white';
    return `${baseClasses} ${this.getTypeClasses()}`;
  }

  private getTypeClasses(): string {
    switch (this.toast.type) {
      case 'success': return 'pym-toast--success';
      case 'error': return 'pym-toast--error';
      case 'warning': return 'pym-toast--warning';
      default: return 'pym-toast--info';
    }
  }

  getIconPath(): string {
    switch (this.toast.type) {
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'error':
        return 'M6 18L18 6M6 6l12 12';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }

  private startProgressTimer(): void {
    if (!this.toast.duration || this.toast.persistent) return;

    const interval = 100; // Update every 100ms
    const steps = this.toast.duration / interval;
    const stepPercent = 100 / steps;
    
    this.progressTimer = window.setInterval(() => {
      this.progressPercent -= stepPercent;
      
      if (this.progressPercent <= 0) {
        this.close();
      }
    }, interval);
  }
}

@Component({
  selector: 'pym-toast-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed top-4 right-4 z-50 max-w-sm w-full space-y-2">
      <pym-toast
        *ngFor="let toast of toasts; trackBy: trackByFn"
        [toast]="toast"
        [showProgress]="showProgress"
        (closeToast)="removeToast($event)"
      ></pym-toast>
    </div>
  `,
  standalone: true,
  imports: [PymToastComponent]
})
export class PymToastContainerComponent {
  @Input() toasts: Toast[] = [];
  @Input() maxToasts: number = 5;
  @Input() showProgress: boolean = true;

  @Output() toastRemoved = new EventEmitter<string>();

  removeToast(id: string): void {
    this.toastRemoved.emit(id);
  }

  trackByFn(index: number, toast: Toast): string {
    return toast.id;
  }
}

@Component({
  selector: 'pym-alert',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="pym-alert"
      [class]="getAlertClasses()"
      [hidden]="dismissed"
    >
      <!-- Icon -->
      <div class="flex-shrink-0">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 min-w-0">
        <h4 *ngIf="title" class="font-medium">{{ title }}</h4>
        <p [class.mt-1]="title">
          <ng-content></ng-content>
        </p>
      </div>

      <!-- Close Button -->
      <button
        *ngIf="dismissible"
        type="button"
        class="flex-shrink-0 ml-4 text-current opacity-70 hover:opacity-100"
        (click)="dismiss()"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymAlertComponent {
  @Input() type: ToastType = 'info';
  @Input() title: string = '';
  @Input() dismissible: boolean = false;

  @Output() dismissed = new EventEmitter<void>();

  dismiss(): void {
    this.dismissed.emit();
  }

  getAlertClasses(): string {
    const baseClasses = 'flex gap-3 p-4 rounded-lg border-l-4';
    return `${baseClasses} ${this.getTypeClasses()}`;
  }

  private getTypeClasses(): string {
    switch (this.type) {
      case 'success': return 'pym-alert--success';
      case 'error': return 'pym-alert--error';
      case 'warning': return 'pym-alert--warning';
      default: return 'bg-blue-50 border-blue-500 text-blue-700';
    }
  }

  getIconPath(): string {
    switch (this.type) {
      case 'success':
        return 'M5 13l4 4L19 7';
      case 'error':
        return 'M6 18L18 6M6 6l12 12';
      case 'warning':
        return 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z';
      default:
        return 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
    }
  }
}