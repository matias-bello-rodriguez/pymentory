import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning';
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

@Component({
  selector: 'pym-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      [class]="buttonClasses"
      (click)="onClick()"
    >
      <!-- Loading Spinner -->
      <div *ngIf="loading" class="pym-spinner" [class]="spinnerSize"></div>
      
      <!-- Icon -->
      <svg *ngIf="icon && !loading" [class]="iconSize" [class.mr-2]="hasContent" 
           fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
      </svg>
      
      <!-- Content -->
      <span *ngIf="hasContent">
        <ng-content></ng-content>
      </span>
    </button>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class PymButtonComponent {
  @Input() variant: ButtonVariant = 'primary';
  @Input() size: ButtonSize = 'md';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Input() icon: string = '';
  @Input() iconOnly: boolean = false;
  @Input() fullWidth: boolean = false;
  @Input() rounded: boolean = false;

  @Output() click = new EventEmitter<void>();

  get hasContent(): boolean {
    return !this.iconOnly;
  }

  get buttonClasses(): string {
    const baseClasses = 'pym-btn pym-focus-outline';
    const variantClass = this.getVariantClass();
    const sizeClass = this.getSizeClass();
    const fullWidthClass = this.fullWidth ? 'w-full' : '';
    const roundedClass = this.rounded ? 'rounded-full' : '';
    const iconOnlyClass = this.iconOnly ? 'p-2' : '';
    const disabledClass = (this.disabled || this.loading) ? 'opacity-50 cursor-not-allowed' : '';

    return [baseClasses, variantClass, sizeClass, fullWidthClass, roundedClass, iconOnlyClass, disabledClass]
      .filter(Boolean)
      .join(' ');
  }

  get iconSize(): string {
    switch (this.size) {
      case 'xs': return 'w-3 h-3';
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-6 h-6';
      case 'xl': return 'w-7 h-7';
      default: return 'w-5 h-5';
    }
  }

  get spinnerSize(): string {
    switch (this.size) {
      case 'xs': return 'w-3 h-3 mr-2';
      case 'sm': return 'w-4 h-4 mr-2';
      case 'lg': return 'w-6 h-6 mr-2';
      case 'xl': return 'w-7 h-7 mr-2';
      default: return 'w-5 h-5 mr-2';
    }
  }

  private getVariantClass(): string {
    switch (this.variant) {
      case 'primary': return 'pym-btn--primary';
      case 'outline': return 'pym-btn--outline';
      case 'ghost': return 'pym-btn--ghost';
      case 'danger': return 'bg-red-600 text-white hover:bg-red-700';
      case 'success': return 'bg-green-600 text-white hover:bg-green-700';
      case 'warning': return 'bg-yellow-600 text-white hover:bg-yellow-700';
      default: return 'bg-gray-100 text-gray-900 hover:bg-gray-200';
    }
  }

  private getSizeClass(): string {
    if (this.iconOnly) return '';
    
    switch (this.size) {
      case 'xs': return 'px-2 py-1 text-xs';
      case 'sm': return 'px-3 py-1.5 text-sm';
      case 'lg': return 'px-6 py-3 text-lg';
      case 'xl': return 'px-8 py-4 text-xl';
      default: return 'px-4 py-2 text-base';
    }
  }

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }

  getIconPath(): string {
    const icons: { [key: string]: string } = {
      'plus': 'M12 4v16m8-8H4',
      'edit': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      'delete': 'M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16',
      'save': 'M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4',
      'search': 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
      'filter': 'M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z',
      'download': 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4',
      'upload': 'M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12',
      'refresh': 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
      'settings': 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      'close': 'M6 18L18 6M6 6l12 12',
      'check': 'M5 13l4 4L19 7',
      'chevron-down': 'M19 9l-7 7-7-7',
      'chevron-up': 'M5 15l7-7 7 7',
      'chevron-left': 'M15 19l-7-7 7-7',
      'chevron-right': 'M9 5l7 7-7 7',
      'menu': 'M4 6h16M4 12h16M4 18h16',
      'home': 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6'
    };
    return icons[this.icon] || '';
  }
}

@Component({
  selector: 'pym-button-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="inline-flex" [class]="groupClasses">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    :host ::ng-deep pym-button:not(:first-child) button {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      border-left-width: 0;
    }
    :host ::ng-deep pym-button:not(:last-child) button {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class PymButtonGroupComponent {
  @Input() vertical: boolean = false;
  @Input() size: ButtonSize = 'md';

  get groupClasses(): string {
    const baseClasses = this.vertical ? 'flex-col' : 'flex-row';
    return `${baseClasses} rounded-lg shadow-sm`;
  }
}

@Component({
  selector: 'pym-fab',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <button
      [type]="type"
      [disabled]="disabled || loading"
      class="fixed bottom-6 right-6 w-14 h-14 bg-primary-600 hover:bg-primary-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      [class.opacity-50]="disabled || loading"
      [class.cursor-not-allowed]="disabled || loading"
      (click)="onClick()"
    >
      <!-- Loading Spinner -->
      <div *ngIf="loading" class="pym-spinner w-6 h-6"></div>
      
      <!-- Icon -->
      <svg *ngIf="!loading" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
      </svg>
    </button>
  `,
  standalone: true,
  imports: [CommonModule]
})
export class PymFabComponent {
  @Input() icon: string = 'plus';
  @Input() type: string = 'button';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;

  @Output() click = new EventEmitter<void>();

  onClick(): void {
    if (!this.disabled && !this.loading) {
      this.click.emit();
    }
  }

  getIconPath(): string {
    const icons: { [key: string]: string } = {
      'plus': 'M12 4v16m8-8H4',
      'edit': 'M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z',
      'message': 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
    };
    return icons[this.icon] || icons['plus'];
  }
}
