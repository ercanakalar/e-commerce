import { Routes } from '@angular/router';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { authGuard } from '../../shared/guards/auth.guard';

export const authRoutes: Routes = [
  {
    path: 'login',
    component: SigninComponent,
    canActivate: [authGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [authGuard],
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    canActivate: [authGuard],
  },
  {
    path: 'reset-password/:resetToken',
    component: ResetPasswordComponent,
    canActivate: [authGuard],
  },
];
