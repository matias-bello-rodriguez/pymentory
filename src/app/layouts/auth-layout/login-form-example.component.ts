import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

// Importar componentes UI
import { PymInputComponent } from '../../shared/ui/input';
import { PymButtonComponent } from '../../shared/ui/button';
import { PymAlertComponent } from '../../shared/ui/toast-alert';
// Importar directivas
import { AutoFocusDirective } from '../../shared/directives/auto-focus.directive';
import { RippleDirective } from '../../shared/directives/ripple.directive';

/**
 * Ejemplo de formulario de login para el AuthLayout
 * Demuestra cómo usar los componentes UI en formularios de autenticación
 */
@Component({
  selector: 'app-login-form',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="auth-form">
      <!-- Header -->
      <div class="text-center mb-6">
        <h2 class="text-xl font-semibold text-gray-900 mb-2">
          Iniciar Sesión
        </h2>
        <p class="text-gray-600">
          Ingresa tus credenciales para acceder
        </p>
      </div>

      <!-- Error Alert -->
      <pym-alert
        *ngIf="loginError"
        type="error"
        [dismissible]="true"
        (dismissed)="clearError()"
        class="mb-4"
      >
        {{ loginError }}
      </pym-alert>

      <!-- Login Form -->
      <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="space-y-4">
        
        <!-- Email Input -->
        <pym-input
          label="Correo electrónico"
          type="email"
          placeholder="tu@email.com"
          prefixIcon="email"
          [required]="true"
          [errorText]="getFieldError('email')"
          formControlName="email"
          pymAutoFocus
        ></pym-input>

        <!-- Password Input -->
        <pym-input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          prefixIcon="lock"
          [required]="true"
          [errorText]="getFieldError('password')"
          formControlName="password"
        ></pym-input>

        <!-- Remember Me & Forgot Password -->
        <div class="flex items-center justify-between">
          <label class="flex items-center">
            <input 
              type="checkbox" 
              formControlName="rememberMe"
              class="pym-checkbox mr-2"
            />
            <span class="text-sm text-gray-600">Recordarme</span>
          </label>
          
          <a 
            href="/auth/forgot-password" 
            class="text-sm pym-text-primary hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>

        <!-- Submit Button -->
        <pym-button
          type="submit"
          variant="primary"
          [fullWidth]="true"
          [loading]="isLoading"
          [disabled]="loginForm.invalid"
          pymRipple
          class="mt-6"
        >
          <span *ngIf="!isLoading">Iniciar Sesión</span>
          <span *ngIf="isLoading">Iniciando sesión...</span>
        </pym-button>
      </form>

      <!-- Register Link -->
      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          ¿No tienes cuenta? 
          <a 
            href="/auth/register" 
            class="pym-text-primary font-medium hover:underline"
          >
            Regístrate aquí
          </a>
        </p>
      </div>

      <!-- Demo Credentials (solo para desarrollo) -->
      <div class="mt-4 p-3 bg-gray-50 rounded-lg" *ngIf="showDemoCredentials">
        <p class="text-xs text-gray-500 font-medium mb-1">Demo:</p>
        <p class="text-xs text-gray-600">admin@Pymentory.com / admin123</p>
      </div>
    </div>
  `,
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PymInputComponent,
    PymButtonComponent,
    PymAlertComponent,
    AutoFocusDirective,
    RippleDirective
  ]
})
export class LoginFormComponent {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';
  showDemoCredentials = true; // Solo para desarrollo

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginError = '';

      // Simular llamada al servidor
      setTimeout(() => {
        const formValue = this.loginForm.value;
        
        // Demo login logic
        if (formValue.email === 'admin@Pymentory.com' && formValue.password === 'admin123') {
          console.log('Login exitoso:', formValue);
          // Aquí redirigiría al dashboard
        } else {
          this.loginError = 'Credenciales incorrectas. Intenta nuevamente.';
        }
        
        this.isLoading = false;
      }, 1500);
    } else {
      this.markFormGroupTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    
    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['email']) {
        return 'Formato de email inválido';
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
    }
    
    return '';
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      email: 'Correo electrónico',
      password: 'Contraseña'
    };
    return labels[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }

  clearError(): void {
    this.loginError = '';
  }
}