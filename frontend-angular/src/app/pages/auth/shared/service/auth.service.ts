import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

import { JwtService } from '../../../../shared/service/jwt.service';
import { ApiService } from '../../../../shared/service/api.service';

import {
  ForgotPassword,
  ForgotPasswordResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
} from '../types/user.type';

import { environment } from '../../../../environments/environments.dev';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private api: ApiService,
    private jwtService: JwtService,
  ) {}

  signIn(variables: SignInRequest) {
    this.api
      .post(environment.BACKEND_API + 'auth/sign-in', variables)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);

        const { accessToken, refreshToken } = res.body as SignInResponse;
        this.jwtService.setAccessToken(accessToken);
        this.jwtService.setRefreshToken(refreshToken);
        this.jwtService.handleTokenNavigation('home');
      });
  }

  signUp(variables: SignUpRequest) {
    this.api
      .post(environment.BACKEND_API + 'auth/sign-up', variables)
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);

        const { accessToken, refreshToken } = res.body as SignUpResponse;
        this.jwtService.setAccessToken(accessToken);
        this.jwtService.setRefreshToken(refreshToken);
        this.jwtService.handleTokenNavigation('home');
      });
  }

  forgotPassword(variables: ForgotPassword) {
    this.api
      .post(environment.BACKEND_API + 'auth/forgot-password', variables)
      .subscribe((res: HttpResponse<any>) => {
        const { resetTokenUrl } = res.body as ForgotPasswordResponse;
        console.log(resetTokenUrl);
        this.jwtService.handleTokenNavigation('home');
      });
  }

  resetPassword(
    token: string,
    variables: { password: string; confirmPassword: string },
  ) {
    this.api
      .patch(
        environment.BACKEND_API + `auth/reset-password/${token}`,
        variables,
      )
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.jwtService.handleTokenNavigation('home');
      });
  }
}
