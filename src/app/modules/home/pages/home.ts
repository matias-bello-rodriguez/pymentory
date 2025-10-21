import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { 
  PymCardComponent, 
} from '../../../shared/ui';

interface ModuleCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  route: string;
  color: string;
  features: string[];
  available: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    PymCardComponent,
    
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  // Módulos disponibles del sistema
  modules = signal<ModuleCard[]>([
    {
      id: 'inventario',
      title: 'Inventario',
      description: 'Gestión completa de productos, categorías y control de stock',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10',
      route: '/inventario',
      color: 'blue',
      features: [
        'Gestión de productos',
        'Control de categorías',
        'Alertas de stock bajo',
        'Reportes de inventario'
      ],
      available: true
    },
    {
      id: 'ventas',
      title: 'Ventas',
      description: 'Registro de ventas, gestión de clientes y facturación',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1',
      route: '/ventas',
      color: 'green',
      features: [
        'Registro de ventas',
        'Gestión de clientes',
        'Historial de transacciones',
        'Facturación'
      ],
      available: true
    },
    {
      id: 'compras',
      title: 'Compras',
      description: 'Gestión de compras, proveedores y órdenes de compra',
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h1m-1-7a1 1 0 100 2 1 1 0 000-2z',
      route: '/compras',
      color: 'purple',
      features: [
        'Órdenes de compra',
        'Gestión de proveedores',
        'Historial de compras',
        'Control de costos'
      ],
      available: true
    },
    {
      id: 'co-fi',
      title: 'Co-Fi (Contabilidad y Finanzas)',
      description: 'Reportes financieros, análisis y estadísticas del negocio',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      route: '/co-fi',
      color: 'yellow',
      features: [
        'Reportes financieros',
        'Análisis de ventas',
        'Estadísticas avanzadas',
        'Indicadores clave'
      ],
      available: true
    },
    {
      id: 'configuracion',
      title: 'Configuración',
      description: 'Ajustes del sistema, usuarios y parámetros generales',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
      route: '/configuracion',
      color: 'gray',
      features: [
        'Gestión de usuarios',
        'Configuración de empresa',
        'Parámetros del sistema',
        'Permisos y roles'
      ],
      available: true
    }
  ]);

  showWelcomeMessage = signal(true);

  constructor(private router: Router) {}

  ngOnInit(): void {
    // Inicialización del componente
    console.log('Home cargado - Módulos disponibles:', this.modules().length);
  }

  // Navegación a módulos
  navigateToModule(module: ModuleCard): void {
    if (module.available) {
      console.log('Navegando a módulo:', module.title);
      this.router.navigate([module.route]);
    } else {
      console.log('Módulo no disponible:', module.title);
    }
  }

  // Funciones utilitarias
  getModuleColorClasses(color: string): { bg: string; text: string; border: string } {
    const colorMap: { [key: string]: { bg: string; text: string; border: string } } = {
      blue: {
        bg: 'bg-blue-50 hover:bg-blue-100',
        text: 'text-blue-600',
        border: 'border-blue-200 hover:border-blue-300'
      },
      green: {
        bg: 'bg-green-50 hover:bg-green-100',
        text: 'text-green-600',
        border: 'border-green-200 hover:border-green-300'
      },
      purple: {
        bg: 'bg-purple-50 hover:bg-purple-100',
        text: 'text-purple-600',
        border: 'border-purple-200 hover:border-purple-300'
      },
      yellow: {
        bg: 'bg-yellow-50 hover:bg-yellow-100',
        text: 'text-yellow-600',
        border: 'border-yellow-200 hover:border-yellow-300'
      },
      gray: {
        bg: 'bg-gray-50 hover:bg-gray-100',
        text: 'text-gray-600',
        border: 'border-gray-200 hover:border-gray-300'
      }
    };
    
    return colorMap[color] || colorMap['gray'];
  }

  dismissWelcome(): void {
    this.showWelcomeMessage.set(false);
  }

  // Track by function para optimizar rendering
  trackByModuleId(index: number, module: ModuleCard): string {
    return module.id;
  }
}
