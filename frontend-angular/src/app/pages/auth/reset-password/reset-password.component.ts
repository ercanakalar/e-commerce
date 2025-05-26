import { NotificationService } from './../../../shared/service/notification.service';
import { Component } from '@angular/core';
import { AuthInputComponent } from '../components/auth-input/auth-input.component';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../shared/service/auth.service';
import { passwordMatchValidator } from '../shared/validators/password-validators';
import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, AuthInputComponent, SubmitButtonComponent],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
})
export class ResetPasswordComponent {
  public resetPasswordForm: FormGroup;
  public resetToken: string | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
    this.resetPasswordForm = this.fb.group(
      {
        password: [
          '123456',
          [
            Validators.required,
            Validators.minLength(6),
            passwordMatchValidator(),
          ],
        ],
        confirmPassword: [
          '123456',
          [
            Validators.required,
            Validators.minLength(6),
            passwordMatchValidator(),
          ],
        ],
      },
      { validators: passwordMatchValidator() },
    );
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.paramMap);
    this.resetToken = this.route.snapshot.paramMap.get('resetToken');
    console.log('Reset Token:', this.resetToken);
  }

  resetPassword() {
    if (!this.resetToken) {
      return this.notificationService.showNotification(
        'error',
        'Reset token is missing.',
      );
    }
    if (this.resetPasswordForm.valid) {
      const { password, confirmPassword } = this.resetPasswordForm.value;
      this.authService.resetPassword(this.resetToken, {
        password,
        confirmPassword,
      });
    } else {
      Object.keys(this.resetPasswordForm.controls).forEach((key) => {
        this.resetPasswordForm.controls[key].markAsTouched();
      });
    }
  }

  changeText(key: string, value: string): void {
    this.resetPasswordForm.controls[key].setValue(value);
    this.resetPasswordForm.controls[key].markAsTouched();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.resetPasswordForm.controls[controlName];
    return control.touched && control.hasError(errorName);
  }

  hasPasswordMismatch(): boolean {
    return this.resetPasswordForm.hasError('passwordMismatch');
  }
}
