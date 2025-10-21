import { Routes } from '@angular/router';
import { authRoutes } from './modules/auth/auth.routes';

export const routes: Routes = [
  // Rutas de autenticación
  {
    path: 'auth',
    children: authRoutes
  },
  
  // Ruta por defecto - redirecciona a login
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  
  // Ruta wildcard para páginas no encontradas
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];
