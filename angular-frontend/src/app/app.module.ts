import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [];
@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    RouterModule, 
    HttpClientModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
