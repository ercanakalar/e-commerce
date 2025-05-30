import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { JwtService } from '../service/jwt.service';

import { TokenType } from '../types/jwt.type';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);
  if (
    !jwtService.getToken(TokenType.ACCESS_TOKEN) ||
    !jwtService.getToken(TokenType.ACCESS_TOKEN)
  ) {
    jwtService.clear();
    route.data = { message: 'Please log in to access this page.' };
    return true;
  }
  if (
    !jwtService.getToken(TokenType.ACCESS_TOKEN) ||
    !jwtService.getToken(TokenType.ACCESS_TOKEN) ||
    jwtService.isRefreshTokenExpired()
  ) {
    jwtService.clear();
    route.data = { message: 'Please log in to access this page.' };
    return false;
  }
  router.navigate(['/']);
  return true;
};
