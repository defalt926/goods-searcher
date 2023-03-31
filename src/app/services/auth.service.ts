import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONST } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
    constructor(private router: Router) {
    }

    login(email: string, password: string) {
      var user = CONST.users.find(user => user.email === email
                                && user.password === password
                                && !user.is_suspended)
      if (user) {
        localStorage.setItem('userId', user.id);
        this.router.navigateByUrl('home');
        return true;
      } else {
        return false;
      }
    }

    getAuthStatus() {
      return CONST.users.find(user => user.id == localStorage.getItem('userId')) != null;
    }

    logout() {
      localStorage.removeItem('userId');
      this.router.navigateByUrl('home');
    }

    getUser() {
      return CONST.users.find(user => user.id == localStorage.getItem('userId'));
    }

    getUserName() {
      return this.getUser()?.last_name + " " + this.getUser()?.first_name;
    }

    getUserEmail() {
      return this.getUser()?.email;
    }
}
