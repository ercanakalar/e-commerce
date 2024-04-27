import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [];
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    RouterModule, 
    HttpClientModule
  ],
  providers: [],
  bootstrap: [],
})
export class AppModule {}
