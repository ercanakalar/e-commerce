import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { JwtService } from '../service/jwt.service';

import { TokenType } from '../types/jwt.type';

export const authGuard: CanActivateFn = (route, state) => {
  const jwtService = inject(JwtService);
  const router = inject(Router);

  if (!jwtService.getToken(TokenType.ACCESS_TOKEN) || !jwtService.getToken(TokenType.ACCESS_TOKEN)) {
    // router.navigate(['/login']);
    return true;
  }
  router.navigate(['/home']);
  return false;
};
