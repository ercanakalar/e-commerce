import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { notificationInterceptor } from './shared/interceptors/notification.interceptor';

const appRoutes: Routes = [];
@NgModule({
  declarations: [],
  imports: [BrowserModule, RouterModule, CommonModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useFactory: () => notificationInterceptor,
      multi: true,
    },
  ],
  bootstrap: [],
})
export class AppModule {}
