import { Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { permissionGuard } from '../../shared/guards/permission.guard';

export const mainRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [permissionGuard('ACCESS_DASHBOARD')],
  },
];
