import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

// Importar componentes UI
import { PymInputComponent } from '../../../../shared/ui/input';
import { PymButtonComponent } from '../../../../shared/ui/button';
import { PymAlertComponent } from '../../../../shared/ui/toast-alert';

// Importar directivas
import { AutoFocusDirective } from '../../../../shared/directives/auto-focus.directive';
import { RippleDirective } from '../../../../shared/directives/ripple.directive';

@Component({
  selector: 'app-login',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    PymInputComponent,
    PymButtonComponent,
    PymAlertComponent,
    AutoFocusDirective,
    RippleDirective
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  isLoading = false;
  loginError = '';

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
        if (formValue.email === 'admin@pyventory.com' && formValue.password === 'admin123') {
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
