# Auth Layout - Guía de Uso

## 🎯 **Propósito**

El `AuthLayoutComponent` es un layout minimalista diseñado específicamente para pantallas de autenticación como login, registro, recuperación de contraseña, etc.

## ✨ **Características**

- ✅ **Diseño centrado** - Formularios centrados en la pantalla
- ✅ **Responsive** - Adaptable a móviles y desktop
- ✅ **Minimalista** - Sin sidebar, header complejo o footer corporativo
- ✅ **Manejo de estados** - Loading, errores globales
- ✅ **Personalizable** - Logo, fondo, colores
- ✅ **Accesible** - Focus management, ARIA labels

## 🏗️ **Estructura**

```
┌─────────────────────────────────┐
│           HEADER                │
│     Logo + Company Name         │
└─────────────────────────────────┘
│                                 │
│           MAIN AREA             │
│    ┌─────────────────────┐      │
│    │    Auth Form Card   │      │
│    │  ┌───────────────┐  │      │
│    │  │ Router Outlet │  │      │
│    │  └───────────────┘  │      │
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
│           FOOTER                │
│      Copyright + Links          │
└─────────────────────────────────┘
```

## 🚀 **Uso Básico**

### 1. **Template Principal**

```html
<!-- app.component.html o routing template -->
<app-auth-layout
  [showLogo]="true"
  [logoUrl]="'/assets/logo.png'"
  [companyName]="'PyVentory'"
  [subtitle]="'Sistema de Gestión de Inventario'"
  [backgroundImage]="'/assets/auth-bg.jpg'"
  [globalLoading]="isAuthenticating"
  [globalError]="authError"
>
  <!-- Footer links opcionales -->
  <div slot="footer-links">
    <a href="/privacy" class="hover:underline">Privacidad</a>
    <a href="/terms" class="hover:underline">Términos</a>
  </div>
  
  <!-- Información adicional -->
  <div slot="additional-info">
    <p class="text-xs text-gray-500">Versión 1.0.0</p>
  </div>
</app-auth-layout>
```

### 2. **Rutas de Autenticación**

```typescript
// auth.routes.ts
export const authRoutes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent },
      { path: 'reset-password', component: ResetPasswordComponent },
      { path: '', redirectTo: 'login', pathMatch: 'full' }
    ]
  }
];
```

## 📝 **Componentes de Formulario**

### **Login Component**

```typescript
@Component({
  template: `
    <div class="space-y-6">
      <!-- Header -->
      <div class="text-center">
        <h2 class="text-xl font-semibold">Iniciar Sesión</h2>
        <p class="text-gray-600 mt-2">Ingresa tus credenciales</p>
      </div>

      <!-- Form -->
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
        <div class="space-y-4">
          <pym-input
            label="Email"
            type="email"
            prefixIcon="email"
            formControlName="email"
            [errorText]="getFieldError('email')"
            pymAutoFocus
          ></pym-input>

          <pym-input
            label="Contraseña"
            type="password"
            prefixIcon="lock"
            formControlName="password"
            [errorText]="getFieldError('password')"
          ></pym-input>

          <pym-button
            type="submit"
            variant="primary"
            [fullWidth]="true"
            [loading]="isLoading"
            pymRipple
          >
            Iniciar Sesión
          </pym-button>
        </div>
      </form>

      <!-- Links -->
      <div class="text-center space-y-2">
        <a routerLink="/auth/forgot-password">¿Olvidaste tu contraseña?</a>
        <p>¿No tienes cuenta? <a routerLink="/auth/register">Regístrate</a></p>
      </div>
    </div>
  `
})
export class LoginComponent { }
```

### **Register Component**

```typescript
@Component({
  template: `
    <div class="space-y-6">
      <div class="text-center">
        <h2 class="text-xl font-semibold">Crear Cuenta</h2>
        <p class="text-gray-600 mt-2">Completa el formulario</p>
      </div>

      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        <div class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <pym-input
              label="Nombre"
              formControlName="firstName"
              pymAutoFocus
            ></pym-input>
            <pym-input
              label="Apellido"
              formControlName="lastName"
            ></pym-input>
          </div>

          <pym-input
            label="Email"
            type="email"
            prefixIcon="email"
            formControlName="email"
          ></pym-input>

          <pym-input
            label="Contraseña"
            type="password"
            prefixIcon="lock"
            formControlName="password"
          ></pym-input>

          <pym-input
            label="Confirmar Contraseña"
            type="password"
            prefixIcon="lock"
            formControlName="confirmPassword"
          ></pym-input>

          <pym-button
            type="submit"
            variant="primary"
            [fullWidth]="true"
            [loading]="isLoading"
          >
            Crear Cuenta
          </pym-button>
        </div>
      </form>

      <div class="text-center">
        <p>¿Ya tienes cuenta? <a routerLink="/auth/login">Inicia sesión</a></p>
      </div>
    </div>
  `
})
export class RegisterComponent { }
```

## 🎨 **Personalización**

### **Variables de Entrada**

| Propiedad | Tipo | Default | Descripción |
|-----------|------|---------|-------------|
| `showLogo` | boolean | true | Mostrar logo en header |
| `logoUrl` | string | '/assets/logo.png' | URL del logo |
| `logoAlt` | string | 'PyVentory Logo' | Alt text del logo |
| `companyName` | string | 'PyVentory' | Nombre de la empresa |
| `subtitle` | string | 'Sistema de...' | Subtítulo bajo el logo |
| `backgroundImage` | string | '' | Imagen de fondo |
| `globalLoading` | boolean | false | Estado de carga global |
| `globalError` | string | '' | Error global a mostrar |
| `showFooter` | boolean | true | Mostrar footer |

### **Personalización CSS**

```css
/* Personalizar colores */
.auth-form-card {
  background: rgba(255, 255, 255, 0.98);
  border: 1px solid var(--pym-gray-200);
}

/* Personalizar animaciones */
.auth-form-card {
  animation: fadeInScale 0.5s ease-out;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

## 🔧 **Estados y Manejo de Errores**

### **Loading States**

```typescript
// Global loading (overlay completo)
<app-auth-layout [globalLoading]="isAuthenticating">

// Loading en botones individuales
<pym-button [loading]="isSubmitting">Enviar</pym-button>
```

### **Error Handling**

```typescript
// Error global (se muestra arriba del formulario)
<app-auth-layout [globalError]="authError">

// Errores de campo individual
<pym-input [errorText]="getFieldError('email')">
```

## 📱 **Responsive Behavior**

- **Desktop**: Formulario centrado con max-width
- **Tablet**: Ajuste automático de padding
- **Mobile**: Formulario de ancho completo con margen mínimo

## ♿ **Accesibilidad**

- ✅ **Auto-focus** en primer campo con `pymAutoFocus`
- ✅ **Focus management** entre campos
- ✅ **ARIA labels** en todos los inputs
- ✅ **Error announcements** para lectores de pantalla
- ✅ **Keyboard navigation** completa

## 🎯 **Casos de Uso**

1. **Login** - Formulario básico de autenticación
2. **Register** - Registro de nuevos usuarios
3. **Forgot Password** - Recuperación de contraseña
4. **Reset Password** - Cambio de contraseña con token
5. **2FA** - Verificación de dos factores
6. **Email Verification** - Confirmación de email

## 🚫 **Lo que NO incluye**

- ❌ Sidebar de navegación
- ❌ Header con notificaciones
- ❌ Footer corporativo complejo
- ❌ Servicios de navegación
- ❌ Menús complejos
- ❌ Estados de usuario autenticado

Este layout se mantiene simple y enfocado únicamente en la experiencia de autenticación.