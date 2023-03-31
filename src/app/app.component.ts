import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'goods-searcher';
  authService: AuthService = {} as AuthService;

  constructor(authService: AuthService) {
    this.authService = authService;
  }
}
