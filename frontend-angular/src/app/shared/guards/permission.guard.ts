import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../service/jwt.service';

export const permissionGuard = (requiredPermission: string): CanActivateFn => {
  return (route, state) => {
    const jwtHelper = inject(JwtService);
    const router = inject(Router);

    const token = localStorage.getItem('access_token');
    if (!token || jwtHelper.isTokenExpired()) {
      router.navigate(['/login']);
      return false;
    }

    const decodedToken = jwtHelper.decodeToken(token);
    console.log(decodedToken);
    
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
