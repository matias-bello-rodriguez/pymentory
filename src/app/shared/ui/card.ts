import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'pym-card',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card.html',
  styleUrls: ['./card.css']
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