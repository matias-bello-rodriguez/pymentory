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
  selector: 'app-change-password',
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
  templateUrl: './change-password.html',
  styleUrl: './change-password.css'
})
export class ChangePassword {
  changePasswordForm: FormGroup;
  isLoading = false;
  error = '';
  success = '';

  constructor(private fb: FormBuilder) {
    this.changePasswordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if (this.changePasswordForm.valid) {
      this.isLoading = true;
      this.error = '';
      this.success = '';

      // Simular llamada al servidor
      setTimeout(() => {
        this.success = 'Contraseña actualizada exitosamente.';
        console.log('Password changed successfully');
        
        // Limpiar el formulario
        this.changePasswordForm.reset();
        
        this.isLoading = false;
      }, 2000);
    } else {
      this.markFormGroupTouched();
    }
  }

  getFieldError(fieldName: string): string {
    const field = this.changePasswordForm.get(fieldName);
    
    if (field?.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) {
        return `${this.getFieldLabel(fieldName)} es requerido`;
      }
      if (field.errors['minlength']) {
        return `Mínimo ${field.errors['minlength'].requiredLength} caracteres`;
      }
      if (field.errors['passwordMismatch']) {
        return 'Las contraseñas no coinciden';
      }
    }
    
    return '';
  }

  private passwordMatchValidator(form: FormGroup) {
    const newPassword = form.get('newPassword');
    const confirmPassword = form.get('confirmPassword');
    
    if (newPassword && confirmPassword && newPassword.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
    
    return null;
  }

  private getFieldLabel(fieldName: string): string {
    const labels: { [key: string]: string } = {
      currentPassword: 'Contraseña actual',
      newPassword: 'Nueva contraseña',
      confirmPassword: 'Confirmar nueva contraseña'
    };
    return labels[fieldName] || fieldName;
  }

  private markFormGroupTouched(): void {
    Object.keys(this.changePasswordForm.controls).forEach(key => {
      this.changePasswordForm.get(key)?.markAsTouched();
    });
  }

  clearError(): void {
    this.error = '';
  }

  clearSuccess(): void {
    this.success = '';
  }
}
