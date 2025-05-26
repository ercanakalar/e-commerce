import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthInputComponent } from '../components/auth-input/auth-input.component';
import { SubmitButtonComponent } from '../../../components/submit-button/submit-button.component';

import { AuthService } from '../shared/service/auth.service';
import { passwordMatchValidator } from '../shared/validators/password-validators';

@Component({
  selector: 'app-signup',
  imports: [AuthInputComponent, SubmitButtonComponent, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  public signupForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['test@test.com', [Validators.required, Validators.email]],
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

  signup() {
    if (this.signupForm.valid) {
      const { email, password, confirmPassword } = this.signupForm.value;
      this.authService.signUp({
        email,
        password,
        confirmPassword,
      });
    } else {
      Object.keys(this.signupForm.controls).forEach((key) => {
        this.signupForm.controls[key].markAsTouched();
      });
    }
  }

  changeText(key: string, value: string): void {
    this.signupForm.controls[key].setValue(value);
    this.signupForm.controls[key].markAsTouched();
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.signupForm.controls[controlName];
    return control.touched && control.hasError(errorName);
  }

  hasPasswordMismatch(): boolean {
    return this.signupForm.hasError('passwordMismatch');
  }
}
