# Main Layout Component

## 🎯 Descripción

El `MainLayoutComponent` es la plantilla principal que envuelve todas las páginas "internas" de la aplicación Pymentory, después de que el usuario ha iniciado sesión. Proporciona la estructura visual global y un contenedor para el contenido dinámico de cada módulo.

## 📁 Estructura

El layout incluye los siguientes componentes:

### 1️⃣ Header (`pym-header`)
- **Funcionalidad**: Barra superior de la aplicación
- **Contiene**:
  - Logo y nombre de la empresa (Pymentory)
  - Barra de búsqueda global
  - Notificaciones (con contador)
  - Menú de usuario (perfil, configuración, cerrar sesión)
- **Eventos**:
  - `searchChange`: Emisión de términos de búsqueda
  - `notificationsToggle`: Toggle del panel de notificaciones
  - `userMenuToggle`: Toggle del menú de usuario

### 2️⃣ Sidebar (`pym-sidebar`)
- **Funcionalidad**: Menú lateral de navegación
- **Características**:
  - Colapsable/expandible
  - Navegación jerárquica con submenús
  - Iconos SVG para cada módulo
  - Badges para contadores (ej: stock bajo)
  - Estados activos basados en la ruta actual
- **Módulos incluidos**:
  - Dashboard
  - Inventario (productos, categorías, stock)
  - Ventas (nueva venta, historial, clientes)
  - Compras (nueva compra, historial, proveedores)
  - Co-Fi (reportes, finanzas)
  - Configuración (empresa, usuarios, sistema)

### 3️⃣ Content Area (`router-outlet`)
- **Funcionalidad**: Área principal donde se renderizan las páginas
- **Características**:
  - Responsive design
  - Scroll independiente
  - Padding adaptativo según el dispositivo

### 4️⃣ Footer (`pym-footer`)
- **Funcionalidad**: Pie de página con información general
- **Contiene**:
  - Copyright y nombre de la empresa
  - Versión de la aplicación
  - Enlaces útiles (soporte, documentación, privacidad)

## 🔧 Configuración

### Datos del Header
```typescript
headerData = {
  logoUrl: '/assets/logo.png',
  logoAlt: 'Pymentory Logo',
  title: 'Pymentory',
  userName: 'Usuario Demo',
  userAvatar: '',
  notificationCount: 3
};
```

### Items del Sidebar
Los elementos de navegación se definen en `sidebarItems` como un signal de Angular, permitiendo actualizaciones reactivas:

```typescript
sidebarItems = signal<SidebarItem[]>([
  {
    id: 'inventario',
    label: 'Inventario',
    icon: 'inventory',
    route: '/inventario',
    children: [
      { id: 'productos', label: 'Productos', route: '/inventario/productos' },
      // ...más items
    ]
  }
  // ...más módulos
]);
```

### Enlaces del Footer
```typescript
footerLinks: FooterLink[] = [
  { label: 'Soporte', url: '/soporte', external: false },
  { label: 'Documentación', url: '/docs', external: false },
  { label: 'Privacidad', url: '/privacidad', external: false }
];
```

## 🎨 Estilos y Responsividad

### Layout Principal
- **Desktop**: Header fijo superior + Sidebar lateral + Content expandible
- **Tablet**: Sidebar colapsable automáticamente
- **Mobile**: Sidebar convertido a menú overlay

### Características CSS
- **Flexbox**: Layout flexible y responsive
- **Sticky positioning**: Header siempre visible
- **Smooth transitions**: Animaciones fluidas para el collapse del sidebar
- **Custom scrollbars**: Barras de desplazamiento estilizadas
- **Dark mode ready**: Soporte para tema oscuro
- **Print friendly**: Optimizado para impresión

## 🔄 Estados y Lógica

### Estados Reactivos
- `sidebarCollapsed`: Controla si el sidebar está colapsado
- `sidebarItems`: Lista reactiva de elementos de navegación

### Métodos Principales
- `updateActiveMenuItem()`: Actualiza el elemento activo basado en la ruta
- `onSidebarItemClick()`: Maneja la navegación y expansión de menús
- `onSidebarToggle()`: Controla el collapse del sidebar
- `onSearch()`, `onNotificationsToggle()`, `onUserMenuToggle()`: Manejadores del header

## 📱 Uso en Rutas

El MainLayout se integra en las rutas principales:

```typescript
{
  path: '',
  component: MainLayoutComponent,
  children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'inventario', component: PlaceholderComponent },
    // ...más rutas
  ]
}
```

## 🎯 Componentes UI Utilizados

El layout utiliza los siguientes componentes de la librería UI:

- `PymHeaderComponent` (header.ts)
- `PymSidebarComponent` (sidebar.ts)  
- `PymFooterComponent` (footer.ts)

Todos estos componentes están diseñados para ser reutilizables y configurables mediante inputs y outputs.

## 🚀 Próximos Pasos

1. **Implementar autenticación**: Verificar permisos antes de mostrar el layout
2. **Agregar breadcrumbs**: Navegación contextual en el content area
3. **Notificaciones en tiempo real**: WebSocket o polling para notificaciones
4. **Personalización de tema**: Permitir cambio de colores y tema oscuro
5. **Persistencia de estado**: Recordar estado del sidebar y preferencias del usuario

## 📚 Dependencias

- Angular 17+ (standalone components)
- Angular Router
- Tailwind CSS (para estilos utilitarios)
- Componentes UI de Pymentory (`shared/ui`)