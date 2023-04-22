import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  user: User;

  constructor(private authService: AuthService) {
    this.user = {} as User
    this.setUser();
  }

  setUser() {
    this.authService.getCurrentUserUid()
      .then((uid) => {
        this.authService.getUsers().subscribe(docs => {
          const user = docs.find(user =>
            user.auth_uid == uid
          ) as User;
          this.user = user;
        });
      })
  }

  getUserName() {
    return this.user.last_name + " " + this.user.first_name;
  }

  getUserEmail() {
    return this.user.email;
  }
}
