# 🔐 Módulo de Autenticación - PyVentory

## 📁 **Estructura del Módulo**

```
auth/
├── components/
│   └── auth-layout/           # Layout base para todas las páginas de auth
│       ├── auth-layout.component.ts
│       ├── auth-layout.component.html
│       └── index.ts
├── pages/
│   ├── login/                 # Página de inicio de sesión
│   ├── register/              # Página de registro
│   ├── forgot-password/       # Página de recuperación de contraseña
│   └── change-password/       # Página de cambio de contraseña
├── guards/                    # Guards de autenticación
├── models/                    # Interfaces y tipos
├── services/                  # Servicios de autenticación
└── auth.routes.ts            # Configuración de rutas
```

## 🎯 **Funcionalidades**

### **AuthLayoutComponent**
- ✅ **Layout unificado** para todas las páginas de autenticación
- ✅ **Diseño responsive** y centrado
- ✅ **Logo personalizable** con fallback
- ✅ **Manejo de estados globales** (loading, errores)
- ✅ **Fondos personalizables**
- ✅ **Footer configurable**

### **Páginas de Autenticación**

#### **1. Login** (`/auth/login`)
- ✅ Formulario de email y contraseña
- ✅ Validación en tiempo real
- ✅ Opción "Recordarme"
- ✅ Enlace a recuperación de contraseña
- ✅ Credenciales demo para testing

#### **2. Register** (`/auth/register`)
- ✅ Formulario completo de registro
- ✅ Validación de contraseñas coincidentes
- ✅ Términos y condiciones
- ✅ Confirmación por email simulada

#### **3. Forgot Password** (`/auth/forgot-password`)
- ✅ Formulario de recuperación por email
- ✅ Mensaje de confirmación
- ✅ Consejos de ayuda adicional

#### **4. Change Password** (`/auth/change-password`)
- ✅ Cambio de contraseña seguro
- ✅ Validación de contraseña actual
- ✅ Confirmación de nueva contraseña
- ✅ Consejos de seguridad

## 🚀 **Configuración de Rutas**

### **En app.routes.ts (Principal)**
```typescript
import { authRoutes } from './modules/auth/auth.routes';

export const routes: Routes = [
  {
    path: 'auth',
    children: authRoutes
  },
  // ... otras rutas
];
```

### **Rutas Disponibles**
- `/auth/login` - Inicio de sesión
- `/auth/register` - Registro de usuario
- `/auth/forgot-password` - Recuperar contraseña
- `/auth/change-password` - Cambiar contraseña

## 🎨 **Personalización del Layout**

```html
<!-- Ejemplo de uso con personalización -->
<app-auth-layout
  [showLogo]="true"
  [logoUrl]="'/assets/company-logo.png'"
  [companyName]="'Tu Empresa'"
  [subtitle]="'Sistema de Gestión'"
  [backgroundImage]="'/assets/auth-background.jpg'"
  [showFooter]="true"
>
  <!-- El contenido de las páginas se renderiza aquí -->
</app-auth-layout>
```

## 🔧 **Componentes UI Utilizados**

- **PymInputComponent** - Campos de entrada con validación
- **PymButtonComponent** - Botones con estados de carga
- **PymAlertComponent** - Alertas de éxito/error
- **PymCardComponent** - Contenedor de formularios
- **PymLoadingComponent** - Indicadores de carga

## 📱 **Responsive Design**

- ✅ **Mobile First** - Optimizado para móviles
- ✅ **Tablet** - Adaptación automática para tablets
- ✅ **Desktop** - Diseño centrado en pantallas grandes
- ✅ **Accesibilidad** - Focus management y ARIA labels

## 🔒 **Seguridad**

- ✅ **Validación client-side** con ReactiveFormsModule
- ✅ **Validación de passwords** con criterios mínimos
- ✅ **Sanitización de inputs** automática
- ✅ **Prevención de XSS** con Angular's built-in protection

## 🧪 **Testing**

Cada componente incluye archivos `.spec.ts` para pruebas unitarias:

```bash
# Ejecutar tests del módulo auth
ng test --include="**/auth/**/*.spec.ts"
```

## 💡 **Próximas Funcionalidades**

- [ ] Autenticación con redes sociales
- [ ] Autenticación de dos factores (2FA)
- [ ] Recuperación de cuenta por SMS
- [ ] Integración con OAuth providers
- [ ] Historial de sesiones
- [ ] Bloqueo de cuenta por intentos fallidos

## 📚 **Ejemplos de Uso**

### **Integración con Guards**
```typescript
// auth.guard.ts
export const authGuard: CanActivateFn = (route, state) => {
  // Lógica de autenticación
  return true; // o false para redireccionar a /auth/login
};
```

### **Integración con Servicios**
```typescript
// En cualquier componente
constructor(private authService: AuthService) {}

login(credentials: LoginCredentials) {
  return this.authService.login(credentials);
}
```