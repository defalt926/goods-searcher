import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isAuthenticated: boolean;

  constructor(private authService: AuthService) {
    this.isAuthenticated = false;
   }

  ngDoCheck() {
    this.isAuthenticated = this.authService.getAuthStatus();
  }

  logout() {
    this.authService.logout();
  }
}
