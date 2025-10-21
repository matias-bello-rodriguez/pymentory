import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

// Importar componentes UI necesarios
import { PymCardComponent } from '../../../../shared/ui/card';
import { PymLoadingComponent } from '../../../../shared/ui/loading-progress';
import { PymAlertComponent } from '../../../../shared/ui/toast-alert';

/**
 * Layout de autenticación minimalista
 * 
 * Características:
 * - Diseño centrado y responsive
 * - Sin sidebar ni header complejo
 * - Solo logo y formulario
 * - Manejo de estados de carga y errores
 * - Fondos personalizables
 */
@Component({
  selector: 'app-auth-layout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auth-layout.component.html',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PymCardComponent,
    PymLoadingComponent,
    PymAlertComponent,
  ]
})
export class AuthLayoutComponent {
  @Input() showLogo: boolean = true;
  @Input() logoUrl: string = '/assets/logo.png';
  @Input() logoAlt: string = 'Pymentory Logo';
  @Input() backgroundImage: string = '';
  @Input() companyName: string = 'Pymentory';
  @Input() subtitle: string = 'Sistema ERP';
  @Input() globalLoading: boolean = false;
  @Input() globalError: string = '';
  @Input() showFooter: boolean = true;
  @Input() currentYear: number = new Date().getFullYear();

  /**
   * Obtiene las clases CSS para el contenedor principal
   */
  get containerClasses(): string {
    const baseClasses = 'min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100';
    const backgroundClass = this.backgroundImage 
      ? 'bg-cover bg-center bg-no-repeat' 
      : '';
    
    return `${baseClasses} ${backgroundClass}`.trim();
  }

  /**
   * Obtiene el estilo inline para imagen de fondo
   */
  get backgroundStyle(): { [key: string]: string } {
    return this.backgroundImage 
      ? { 'background-image': `url(${this.backgroundImage})` }
      : {};
  }

  /**
   * Maneja el cierre de errores globales
   */
  onErrorDismiss(): void {
    // En una implementación real, esto emitiría un evento
    // para que el componente padre maneje el cierre del error
  }
}