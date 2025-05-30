import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { tap } from 'rxjs';

import { NotificationService } from '../service/notification.service';

export const notificationInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    tap(
      (event) => {
        if (event instanceof HttpResponse) {
          const body: any = event.body;
          const message = body?.message;
          if (message) notificationService.showNotification('success', message);
        }
      },
      (error) => {
        console.log(error);
        
        if (error.error && error.error.message) {
          return notificationService.showNotification(
            'error',
            error.error.message,
          );
        }
        if (error.status === 0) {
          return notificationService.showNotification(
            'error',
            'Network error, please try again later.',
          );
        }
        return notificationService.showNotification(
          'error',
          'An unexpected error occurred.',
        );
      },
    ),
  );
};
