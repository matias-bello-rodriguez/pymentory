import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routes';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PlaceholderComponent } from './pages/placeholder/placeholder.component';
import { HomeComponent } from './modules/home/pages/home';

export const routes: Routes = [
  // Rutas de autenticación
  {
    path: 'auth',
    children: authRoutes
  },
  
  // Rutas principales con MainLayout
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // Home/Dashboard principal
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'inventario',
        component: PlaceholderComponent
      },
      {
        path: 'ventas',
        component: PlaceholderComponent
      },
      {
        path: 'compras',
        component: PlaceholderComponent
      },
      {
        path: 'co-fi',
        component: PlaceholderComponent
      },
      {
        path: 'configuracion',
        component: PlaceholderComponent
      },
      // Redirección por defecto al home cuando se accede a la raíz
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  
  // Ruta wildcard para páginas no encontradas
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
