import { Component, OnInit, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { 
  PymHeaderComponent, 
  PymSidebarComponent, 
  PymFooterComponent,
  SidebarItem,
  FooterLink 
} from '../../shared/ui';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    PymHeaderComponent,
    PymSidebarComponent,
    PymFooterComponent
  ],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent implements OnInit {
  // Sidebar state
  sidebarCollapsed = signal(false);
  
  // Header data
  headerData = {
    logoUrl: '/assets/logo.png',
    logoAlt: 'Pymentory Logo',
    title: 'Pymentory',
    userName: 'Usuario Demo',
    userAvatar: '',
    notificationCount: 3
  };

  // Sidebar navigation items
  sidebarItems = signal<SidebarItem[]>([
    {
      id: 'home',
      label: 'Home',
      icon: 'dashboard',
      route: '/home',
      active: false
    },
    {
      id: 'inventario',
      label: 'Inventario',
      icon: 'inventory',
      route: '/inventario',
      active: false,
      children: [
        {
          id: 'productos',
          label: 'Productos',
          route: '/inventario/productos'
        },
        {
          id: 'categorias',
          label: 'Categorías',
          route: '/inventario/categorias'
        },
        {
          id: 'stock',
          label: 'Control de Stock',
          route: '/inventario/stock',
          badge: 5
        }
      ]
    },
    {
      id: 'ventas',
      label: 'Ventas',
      icon: 'sales',
      route: '/ventas',
      active: false,
      children: [
        {
          id: 'nueva-venta',
          label: 'Nueva Venta',
          route: '/ventas/nueva'
        },
        {
          id: 'historial-ventas',
          label: 'Historial',
          route: '/ventas/historial'
        },
        {
          id: 'clientes',
          label: 'Clientes',
          route: '/ventas/clientes'
        }
      ]
    },
    {
      id: 'compras',
      label: 'Compras',
      icon: 'purchases',
      route: '/compras',
      active: false,
      children: [
        {
          id: 'nueva-compra',
          label: 'Nueva Compra',
          route: '/compras/nueva'
        },
        {
          id: 'historial-compras',
          label: 'Historial',
          route: '/compras/historial'
        },
        {
          id: 'proveedores',
          label: 'Proveedores',
          route: '/compras/proveedores'
        }
      ]
    },
    {
      id: 'co-fi',
      label: 'Co-Fi',
      icon: 'reports',
      route: '/co-fi',
      active: false,
      children: [
        {
          id: 'reportes',
          label: 'Reportes',
          route: '/co-fi/reportes'
        },
        {
          id: 'finanzas',
          label: 'Finanzas',
          route: '/co-fi/finanzas'
        }
      ]
    },
    {
      id: 'configuracion',
      label: 'Configuración',
      icon: 'settings',
      route: '/configuracion',
      active: false,
      children: [
        {
          id: 'empresa',
          label: 'Empresa',
          route: '/configuracion/empresa'
        },
        {
          id: 'usuarios',
          label: 'Usuarios',
          route: '/configuracion/usuarios'
        },
        {
          id: 'sistema',
          label: 'Sistema',
          route: '/configuracion/sistema'
        }
      ]
    }
  ]);

  // Footer links
  footerLinks: FooterLink[] = [
    {
      label: 'Soporte',
      url: '/soporte',
      external: false
    },
    {
      label: 'Documentación',
      url: '/docs',
      external: false
    },
    {
      label: 'Privacidad',
      url: '/privacidad',
      external: false
    }
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.updateActiveMenuItem();
  }

  // Header event handlers
  onSearch(searchTerm: string): void {
    console.log('Búsqueda:', searchTerm);
    // Implementar lógica de búsqueda global
  }

  onNotificationsToggle(isOpen: boolean): void {
    console.log('Notificaciones:', isOpen ? 'Abiertas' : 'Cerradas');
    // Implementar lógica de notificaciones
  }

  onUserMenuToggle(isOpen: boolean): void {
    console.log('Menú usuario:', isOpen ? 'Abierto' : 'Cerrado');
    // Implementar lógica del menú de usuario
  }

  // Sidebar event handlers
  onSidebarItemClick(item: SidebarItem): void {
    console.log('Navegando a:', item.label, item.route);
    
    // Si tiene ruta y no tiene hijos, navegar
    if (item.route && (!item.children || item.children.length === 0)) {
      this.router.navigate([item.route]);
      this.updateActiveMenuItem(item.route);
    }
  }

  onSidebarToggle(collapsed: boolean): void {
    this.sidebarCollapsed.set(collapsed);
    console.log('Sidebar:', collapsed ? 'Colapsado' : 'Expandido');
  }

  // Utility methods
  private updateActiveMenuItem(currentRoute?: string): void {
    const route = currentRoute || this.router.url;
    
    // Reset all active states
    const items = this.sidebarItems();
    items.forEach(item => {
      item.active = false;
      if (item.children) {
        item.children.forEach(child => child.active = false);
      }
    });

    // Set active based on current route
    items.forEach(item => {
      if (item.route === route) {
        item.active = true;
      } else if (item.children) {
        const activeChild = item.children.find(child => child.route === route);
        if (activeChild) {
          item.active = true; // Expandir el padre
          activeChild.active = true;
        }
      }
    });

    this.sidebarItems.set([...items]);
  }

  // User menu actions (para usar en el template)
  onLogout(): void {
    console.log('Cerrando sesión...');
    // Implementar lógica de logout
    this.router.navigate(['/auth/login']);
  }

  onProfile(): void {
    console.log('Ir al perfil...');
    this.router.navigate(['/profile']);
  }

  onSettings(): void {
    console.log('Ir a configuración...');
    this.router.navigate(['/configuracion']);
  }
}
