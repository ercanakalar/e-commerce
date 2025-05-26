import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthInputComponent } from '../components/auth-input/auth-input.component';
import { AuthService } from '../shared/service/auth.service';
import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';

@Component({
  selector: 'app-forgot-password',
  imports: [ReactiveFormsModule, AuthInputComponent, SubmitButtonComponent],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
})
export class ForgotPasswordComponent {
  public forgotPasswordForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.forgotPasswordForm = this.fb.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
    });
  }

  changeText(key: string, value: string): void {
    this.forgotPasswordForm.controls[key].setValue(value);
    this.forgotPasswordForm.controls[key].markAsTouched();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.forgotPasswordForm.controls[controlName];
    return control.touched && control.hasError(errorName);
  }

  forgotPassword() {
    if (this.forgotPasswordForm.valid) {
      const { email } = this.forgotPasswordForm.value;
      this.authService.forgotPassword({ email });
    } else {
      Object.keys(this.forgotPasswordForm.controls).forEach((key) => {
        this.forgotPasswordForm.controls[key].markAsTouched();
      });
    }
  }
}
