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
  selector: 'app-forgot-password',
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
  templateUrl: './forgot-password.html',
  styleUrl: './forgot-password.css'
})
export class ForgotPassword {
  forgotPasswordForm: FormGroup;
  isLoading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      this.isLoading = true;
      this.error = '';
      this.success = '';

      // Simular llamada al servidor
      setTimeout(() => {
        this.success = 'Se ha enviado un enlace de recuperación a tu correo electrónico.';
        console.log('Reset password email sent to:', this.forgotPasswordForm.value.email);
        
        this.isLoading = false;
      }, 2000);
    } else {
      this.forgotPasswordForm.get('email')?.markAsTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.forgotPasswordForm.get(fieldName);
    
    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return 'Correo electrónico es requerido';
      }
      if (field.errors['email']) {
        return 'Formato de email inválido';
      }
    }
    
    return '';
  }

  clearError(): void {
    this.error = '';
  }

  clearSuccess(): void {
    this.success = '';
  }
}
