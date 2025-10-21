import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pym-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="pym-card"
      [class]="additionalClasses"
      [ngClass]="{
        'pym-shadow': shadow,
        'border-2': bordered,
        'hover:shadow-md': hoverable,
        'cursor-pointer': clickable
      }"
    >
      <!-- Header -->
      <div *ngIf="title || hasHeaderContent" class="mb-4 pb-3 border-b border-gray-200">
        <div class="flex items-center justify-between">
          <h3 *ngIf="title" class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          <ng-content select="[slot=header]"></ng-content>
        </div>
        <p *ngIf="subtitle" class="text-sm pym-text-muted mt-1">{{ subtitle }}</p>
      </div>

      <!-- Content -->
      <div class="card-content">
        <ng-content></ng-content>
      </div>

      <!-- Footer -->
      <div *ngIf="hasFooterContent" class="mt-4 pt-3 border-t border-gray-200">
        <ng-content select="[slot=footer]"></ng-content>
      </div>
    </div>
  `
})
export class PymCardComponent {
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() shadow: boolean = true;
  @Input() bordered: boolean = false;
  @Input() hoverable: boolean = false;
  @Input() clickable: boolean = false;
  @Input() additionalClasses: string = '';

  get hasHeaderContent(): boolean {
    // This would need to be checked via ViewChild in a real implementation
    return false;
  }

  get hasFooterContent(): boolean {
    // This would need to be checked via ViewChild in a real implementation
    return false;
  }
}