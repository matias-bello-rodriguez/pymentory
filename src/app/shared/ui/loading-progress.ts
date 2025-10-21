import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pym-loading',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <!-- Spinner Loading -->
    <div *ngIf="type === 'spinner'" class="flex items-center justify-center" [class]="containerClasses">
      <div class="pym-spinner" [class]="spinnerClasses"></div>
      <span *ngIf="text" class="ml-2 pym-text-muted">{{ text }}</span>
    </div>

    <!-- Progress Bar Loading -->
    <div *ngIf="type === 'progress'" class="w-full">
      <div class="flex justify-between items-center mb-2" *ngIf="text || showPercent">
        <span *ngIf="text" class="text-sm pym-text-muted">{{ text }}</span>
        <span *ngIf="showPercent" class="text-sm pym-text-muted">{{ progress }}%</span>
      </div>
      <div class="pym-progress">
        <div 
          class="pym-progress-bar"
          [style.width.%]="progress"
        ></div>
      </div>
    </div>

    <!-- Skeleton Loading -->
    <div *ngIf="type === 'skeleton'" class="animate-pulse">
      <ng-container [ngSwitch]="skeletonType">
        <!-- Text Skeleton -->
        <div *ngSwitchCase="'text'" class="space-y-3">
          <div class="h-4 bg-gray-300 rounded w-3/4"></div>
          <div class="h-4 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-5/6"></div>
        </div>

        <!-- Card Skeleton -->
        <div *ngSwitchCase="'card'" class="border border-gray-200 rounded-lg p-4">
          <div class="flex space-x-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full"></div>
            <div class="flex-1 space-y-2">
              <div class="h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="h-3 bg-gray-300 rounded w-1/2"></div>
            </div>
          </div>
          <div class="mt-4 space-y-2">
            <div class="h-3 bg-gray-300 rounded"></div>
            <div class="h-3 bg-gray-300 rounded w-5/6"></div>
          </div>
        </div>

        <!-- Table Skeleton -->
        <div *ngSwitchCase="'table'" class="space-y-3">
          <div class="grid grid-cols-4 gap-4">
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
            <div class="h-4 bg-gray-300 rounded"></div>
          </div>
          <div *ngFor="let row of skeletonRows" class="grid grid-cols-4 gap-4">
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
            <div class="h-3 bg-gray-200 rounded"></div>
          </div>
        </div>

        <!-- Custom Skeleton -->
        <div *ngSwitchDefault>
          <ng-content></ng-content>
        </div>
      </ng-container>
    </div>

    <!-- Dots Loading -->
    <div *ngIf="type === 'dots'" class="flex items-center justify-center gap-1" [class]="containerClasses">
      <div class="w-2 h-2 bg-current rounded-full animate-bounce"></div>
      <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay: 0.1s;"></div>
      <div class="w-2 h-2 bg-current rounded-full animate-bounce" style="animation-delay: 0.2s;"></div>
      <span *ngIf="text" class="ml-3 pym-text-muted">{{ text }}</span>
    </div>

    <!-- Pulse Loading -->
    <div *ngIf="type === 'pulse'" class="flex items-center justify-center" [class]="containerClasses">
      <div 
        class="rounded-full animate-pulse"
        [class]="pulseClasses"
      ></div>
      <span *ngIf="text" class="ml-2 pym-text-muted">{{ text }}</span>
    </div>
  `,
  styles: [`
    @keyframes bounce {
      0%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
    }
    
    .animate-bounce {
      animation: bounce 1.4s infinite ease-in-out;
    }
  `],
  standalone: true,
  imports: [CommonModule]
})
export class PymLoadingComponent {
  @Input() type: 'spinner' | 'progress' | 'skeleton' | 'dots' | 'pulse' = 'spinner';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() text: string = '';
  @Input() progress: number = 0;
  @Input() showPercent: boolean = false;
  @Input() skeletonType: 'text' | 'card' | 'table' | 'custom' = 'text';
  @Input() skeletonRows: number[] = [1, 2, 3, 4, 5];
  @Input() overlay: boolean = false;

  get containerClasses(): string {
    const base = this.overlay ? 'fixed inset-0 bg-white/80 z-50' : '';
    return base;
  }

  get spinnerClasses(): string {
    switch (this.size) {
      case 'sm': return 'w-4 h-4';
      case 'lg': return 'w-8 h-8';
      default: return 'w-6 h-6';
    }
  }

  get pulseClasses(): string {
    const sizeClasses = {
      'sm': 'w-4 h-4',
      'md': 'w-6 h-6',
      'lg': 'w-8 h-8'
    };
    return `${sizeClasses[this.size]} bg-primary-500`;
  }
}

@Component({
  selector: 'pym-progress',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="w-full">
      <!-- Label -->
      <div class="flex justify-between items-center mb-2" *ngIf="label || showValue">
        <label *ngIf="label" class="text-sm font-medium text-gray-700">{{ label }}</label>
        <span *ngIf="showValue" class="text-sm pym-text-muted">
          {{ formatValue() }}
        </span>
      </div>

      <!-- Progress Bar -->
      <div class="pym-progress" [class]="progressClasses">
        <div 
          class="pym-progress-bar transition-all duration-300"
          [class]="barClasses"
          [style.width.%]="percentage"
        ></div>
      </div>

      <!-- Description -->
      <p *ngIf="description" class="mt-1 text-xs pym-text-muted">{{ description }}</p>
    </div>
  `,
  standalone: true,
  imports: []
})
export class PymProgressComponent {
  @Input() value: number = 0;
  @Input() max: number = 100;
  @Input() label: string = '';
  @Input() description: string = '';
  @Input() showValue: boolean = true;
  @Input() valueType: 'percentage' | 'fraction' | 'value' = 'percentage';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() variant: 'default' | 'success' | 'warning' | 'danger' = 'default';
  @Input() striped: boolean = false;
  @Input() animated: boolean = false;

  get percentage(): number {
    return Math.min(Math.max((this.value / this.max) * 100, 0), 100);
  }

  get progressClasses(): string {
    const sizeClasses = {
      'sm': 'h-2',
      'md': 'h-3',
      'lg': 'h-4'
    };
    return sizeClasses[this.size];
  }

  get barClasses(): string {
    const variantClasses = {
      'default': 'bg-primary-500',
      'success': 'bg-green-500',
      'warning': 'bg-yellow-500',
      'danger': 'bg-red-500'
    };
    
    let classes = variantClasses[this.variant];
    
    if (this.striped) {
      classes += ' bg-gradient-to-r from-current to-transparent bg-[length:1rem_1rem]';
    }
    
    if (this.animated) {
      classes += ' animate-pulse';
    }
    
    return classes;
  }

  formatValue(): string {
    switch (this.valueType) {
      case 'fraction':
        return `${this.value}/${this.max}`;
      case 'value':
        return this.value.toString();
      default:
        return `${Math.round(this.percentage)}%`;
    }
  }
}