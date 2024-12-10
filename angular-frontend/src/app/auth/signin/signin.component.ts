import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { AuthInputComponent } from '../components/auth-input/auth-input.component';
import { SubmitButtonComponent } from '../../components/submit-button/submit-button.component';

@Component({
  selector: 'app-signin',
  imports: [AuthInputComponent, SubmitButtonComponent, ReactiveFormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.scss',
})
export class SigninComponent {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  changeText(key: string, value: string): void {
    this.loginForm.controls[key].setValue(value);
    this.loginForm.controls[key].markAsTouched();
  }

  login(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log('Login successful:', { username, password });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        this.loginForm.controls[key].markAsTouched();
      });
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    const control = this.loginForm.controls[controlName];

    return control.touched && control.hasError(errorName);
  }
}
