import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'pym-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span 
      class="pym-badge"
      [class]="badgeClasses"
    >
      <!-- Icon -->
      <svg *ngIf="icon" [class]="iconSize" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" [attr.d]="getIconPath()"/>
      </svg>
      
      <!-- Content -->
      <ng-content></ng-content>
      
      <!-- Close Button -->
      <button
        *ngIf="removable"
        type="button"
        class="ml-1 -mr-1 p-0.5 rounded-full hover:bg-black/10"
        (click)="onRemove()"
      >
        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </span>
  `,
  standalone: true,
  imports: []
})
export class PymBadgeComponent {
  @Input() variant: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' = 'default';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() pill: boolean = false;
  @Input() outline: boolean = false;
  @Input() icon: string = '';
  @Input() removable: boolean = false;

  onRemove(): void {
    // Emit remove event or handle removal logic
  }

  get badgeClasses(): string {
    const baseClasses = 'inline-flex items-center gap-1 font-medium';
    const variantClass = this.getVariantClass();
    const sizeClass = this.getSizeClass();
    const shapeClass = this.pill ? 'rounded-full' : 'rounded';
    
    return [baseClasses, variantClass, sizeClass, shapeClass].join(' ');
  }

  get iconSize(): string {
    switch (this.size) {
      case 'sm': return 'w-3 h-3';
      case 'lg': return 'w-5 h-5';
      default: return 'w-4 h-4';
    }
  }

  private getVariantClass(): string {
    const outlinePrefix = this.outline ? 'border ' : '';
    
    switch (this.variant) {
      case 'primary':
        return this.outline 
          ? `${outlinePrefix}border-primary-500 text-primary-700 bg-transparent`
          : 'pym-badge--primary';
      case 'success':
        return this.outline
          ? `${outlinePrefix}border-green-500 text-green-700 bg-transparent`
          : 'pym-badge--success';
      case 'warning':
        return this.outline
          ? `${outlinePrefix}border-yellow-500 text-yellow-700 bg-transparent`
          : 'pym-badge--warning';
      case 'danger':
        return this.outline
          ? `${outlinePrefix}border-red-500 text-red-700 bg-transparent`
          : 'pym-badge--danger';
      case 'info':
        return this.outline
          ? `${outlinePrefix}border-blue-500 text-blue-700 bg-transparent`
          : 'bg-blue-100 text-blue-700';
      default:
        return this.outline
          ? `${outlinePrefix}border-gray-500 text-gray-700 bg-transparent`
          : 'bg-gray-100 text-gray-700';
    }
  }

  private getSizeClass(): string {
    switch (this.size) {
      case 'sm': return 'px-2 py-0.5 text-xs';
      case 'lg': return 'px-3 py-1 text-base';
      default: return 'px-2.5 py-0.5 text-sm';
    }
  }

  getIconPath(): string {
    const icons: { [key: string]: string } = {
      'check': 'M5 13l4 4L19 7',
      'x': 'M6 18L18 6M6 6l12 12',
      'exclamation': 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.232 16.5c-.77.833.192 2.5 1.732 2.5z',
      'info': 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
      'star': 'M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z'
    };
    return icons[this.icon] || '';
  }
}

@Component({
  selector: 'pym-avatar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div 
      class="pym-avatar"
      [class]="avatarClasses"
      [title]="name"
    >
      <!-- Image -->
      <img 
        *ngIf="src && !imageError"
        [src]="src"
        [alt]="name"
        class="w-full h-full object-cover"
        (error)="onImageError()"
      />
      
      <!-- Initials -->
      <span 
        *ngIf="!src || imageError"
        class="text-white font-medium"
        [class]="initialsClasses"
      >
        {{ getInitials() }}
      </span>
      
      <!-- Status Indicator -->
      <div 
        *ngIf="status"
        class="absolute bottom-0 right-0 rounded-full border-2 border-white"
        [class]="statusClasses"
      ></div>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymAvatarComponent {
  @Input() src: string = '';
  @Input() name: string = '';
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md';
  @Input() shape: 'circle' | 'square' = 'circle';
  @Input() status: 'online' | 'offline' | 'away' | 'busy' | '' = '';

  imageError: boolean = false;

  onImageError(): void {
    this.imageError = true;
  }

  get avatarClasses(): string {
    const sizeClasses = {
      'xs': 'w-6 h-6',
      'sm': 'w-8 h-8',
      'md': 'w-10 h-10',
      'lg': 'w-12 h-12',
      'xl': 'w-16 h-16',
      '2xl': 'w-20 h-20'
    };
    
    const shapeClass = this.shape === 'circle' ? 'rounded-full' : 'rounded-lg';
    const bgClass = (!this.src || this.imageError) ? 'bg-gray-500' : '';
    
    return `${sizeClasses[this.size]} ${shapeClass} ${bgClass} flex items-center justify-center relative overflow-hidden`;
  }

  get initialsClasses(): string {
    const textSizes = {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl'
    };
    return textSizes[this.size];
  }

  get statusClasses(): string {
    const sizeClasses = {
      'xs': 'w-1.5 h-1.5',
      'sm': 'w-2 h-2',
      'md': 'w-2.5 h-2.5',
      'lg': 'w-3 h-3',
      'xl': 'w-4 h-4',
      '2xl': 'w-5 h-5'
    };
    
    const statusColors: { [key: string]: string } = {
      'online': 'bg-green-500',
      'offline': 'bg-gray-400',
      'away': 'bg-yellow-500',
      'busy': 'bg-red-500'
    };
    
    return `${sizeClasses[this.size]} ${statusColors[this.status] || ''}`;
  }

  getInitials(): string {
    if (!this.name) return '?';
    
    return this.name
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}

@Component({
  selector: 'pym-avatar-group',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="flex -space-x-2">
      <ng-content></ng-content>
      
      <!-- More Count -->
      <div 
        *ngIf="moreCount > 0"
        class="pym-avatar bg-gray-100 text-gray-600 border-2 border-white"
        [class]="avatarSizeClasses"
      >
        <span class="font-medium text-xs">+{{ moreCount }}</span>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep pym-avatar {
      border: 2px solid white;
    }
  `],
  standalone: true,
  imports: []
})
export class PymAvatarGroupComponent {
  @Input() moreCount: number = 0;
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' = 'md';

  get avatarSizeClasses(): string {
    const sizeClasses = {
      'xs': 'w-6 h-6',
      'sm': 'w-8 h-8',
      'md': 'w-10 h-10',
      'lg': 'w-12 h-12',
      'xl': 'w-16 h-16'
    };
    return `${sizeClasses[this.size]} rounded-full flex items-center justify-center`;
  }
}