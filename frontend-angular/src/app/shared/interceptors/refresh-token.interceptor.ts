import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';

import { AuthService } from '../../pages/auth/shared/service/auth.service';
import { JwtService } from '../service/jwt.service';

export const refreshTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const jwtService = inject(JwtService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((response: HttpResponse<any>) => {
            const accessToken = response.body?.accessToken;
            const refreshToken = response.body?.refreshToken;
            const refreshedReq = req.clone({
              setHeaders: { Authorization: `Bearer ${accessToken}` },
            });
            jwtService.setAccessToken(accessToken);
            jwtService.setRefreshToken(refreshToken);
            return next(refreshedReq);
          }),
        );
      }

      return throwError(() => error);
    }),
  );
};
