import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONST } from '../shared/constants';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private user?: User;

    constructor(private router: Router) {
    }

    login(email: string, password: string) {
      var user = CONST.users.find(user => user.email === email && user.password === password)
        if (user) {
          this.user = user; 
          this.router.navigateByUrl('home');
        }
    }

    getAuthStatus() {
      return this.user !== undefined;
    }
}
