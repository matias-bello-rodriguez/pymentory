import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'pym-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="pym-header">
      <div class="flex items-center gap-4">
        <img [src]="logoUrl" [alt]="logoAlt" class="h-8 w-auto" />
        <h1 class="text-xl font-semibold pym-text-primary">{{ title }}</h1>
      </div>
      
      <div class="flex items-center gap-4">
        <!-- Search -->
        <div class="relative" *ngIf="showSearch">
          <input 
            type="text" 
            placeholder="Buscar..."
            class="pym-input pl-10 w-64"
            [(ngModel)]="searchValue"
            (input)="onSearch(searchValue)"
          />
          <svg class="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 pym-text-muted" 
               fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>

        <!-- Notifications -->
        <div class="relative" *ngIf="showNotifications">
          <button 
            class="pym-btn--ghost p-2 relative"
            (click)="toggleNotifications()"
            [class.pym-bg-primary-50]="notificationsOpen"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M15 17h5l-5 5v-5zM11 19H6.5A2.5 2.5 0 014 16.5v-9A2.5 2.5 0 016.5 5h11A2.5 2.5 0 0120 7.5v4"/>
            </svg>
            <span *ngIf="notificationCount > 0" 
                  class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {{ notificationCount > 99 ? '99+' : notificationCount }}
            </span>
          </button>
        </div>

        <!-- User Menu -->
        <div class="relative" *ngIf="showUserMenu">
          <button 
            class="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
            (click)="toggleUserMenu()"
          >
            <div class="pym-avatar pym-avatar--sm">
              <img *ngIf="userAvatar" [src]="userAvatar" [alt]="userName" class="w-full h-full rounded-full object-cover" />
              <span *ngIf="!userAvatar">{{ getUserInitials() }}</span>
            </div>
            <span class="font-medium text-gray-700">{{ userName }}</span>
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
            </svg>
          </button>

          <!-- User Dropdown -->
          <div *ngIf="userMenuOpen" class="pym-dropdown-content right-0 mt-2 w-48">
            <ng-content select="[slot=user-menu]"></ng-content>
          </div>
        </div>
      </div>
    </header>
  `,
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