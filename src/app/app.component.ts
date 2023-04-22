import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'goods-searcher';

  constructor(private authService: AuthService) { }

  isAuthenticated() {
    return this.authService.getAuthStatus();
  }

  logout() {
    this.authService.logout();
  }
}
