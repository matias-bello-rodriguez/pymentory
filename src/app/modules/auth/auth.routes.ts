import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './components/auth-layout';

// Importar páginas de autenticación
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { ChangePassword } from './pages/change-password/change-password';

export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'login',
        component: Login,
        title: 'Iniciar Sesión - Pymentory'
      },
      {
        path: 'register',
        component: Register,
        title: 'Registrarse - Pymentory'
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
        title: 'Recuperar Contraseña - Pymentory'
      },
      {
        path: 'change-password',
        component: ChangePassword,
        title: 'Cambiar Contraseña - Pymentory'
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }
];