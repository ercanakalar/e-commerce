import { Component } from '@angular/core';
import { AuthService } from '../../auth/shared/service/auth.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  constructor(authService: AuthService) {
    authService.getUserById().subscribe((data) => {
      console.log(data);
      
    });
  }
}
