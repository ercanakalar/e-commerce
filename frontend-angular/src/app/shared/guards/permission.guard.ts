import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';
import { TokenType } from '../types/jwt.type';

export const permissionGuard = (requiredPermission: string): CanActivateFn => {
  return (route, state) => {
    const jwtHelper = inject(JwtService);
    const router = inject(Router);

    const token =
      localStorage.getItem(TokenType.ACCESS_TOKEN) ||
      localStorage.getItem(TokenType.ACCESS_TOKEN);
    if (!token) {
      router.navigate(['/login']);
      return false;
    }

    const decodedToken = jwtHelper.decodeToken(token);

    const permissions: { name: string }[] = decodedToken?.permissions || [];

    const hasPermission = permissions.some(
      (p) => p.name === requiredPermission,
    );

    if (!hasPermission) {
      router.navigate(['/']);
    }

    return hasPermission;
  };
};
