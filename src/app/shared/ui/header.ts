import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pym-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class PymHeaderComponent {
  @Input() logoUrl: string = '';
  @Input() logoAlt: string = 'Logo';
  @Input() title: string = '';
  @Input() showSearch: boolean = true;
  @Input() showNotifications: boolean = true;
  @Input() showUserMenu: boolean = true;
  @Input() userName: string = '';
  @Input() userAvatar: string = '';
  @Input() notificationCount: number = 0;

  @Output() searchChange = new EventEmitter<string>();
  @Output() notificationsToggle = new EventEmitter<boolean>();
  @Output() userMenuToggle = new EventEmitter<boolean>();

  searchValue: string = '';
  notificationsOpen: boolean = false;
  userMenuOpen: boolean = false;

  onSearch(value: string): void {
    this.searchChange.emit(value);
  }

  toggleNotifications(): void {
    this.notificationsOpen = !this.notificationsOpen;
    this.notificationsToggle.emit(this.notificationsOpen);
  }

  toggleUserMenu(): void {
    this.userMenuOpen = !this.userMenuOpen;
    this.userMenuToggle.emit(this.userMenuOpen);
  }

  getUserInitials(): string {
    return this.userName
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }
}