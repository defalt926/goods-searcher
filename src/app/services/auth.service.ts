import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/models/user.model';
import { Observable } from 'rxjs';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private router: Router,
              private firestore: AngularFirestore,
              private auth: Auth) {
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  getUsers(): Observable<User[]> {
    return this.firestore.collection<User>("users").valueChanges();
  }

  getAuthStatus() {
    return this.auth.currentUser ? true : false
  }

  logout() {
    this.auth.signOut();
  }

  async getCurrentUserUid() {
    return this.auth.currentUser
      ? this.auth.currentUser.uid
      : new Promise<string>((resolve, reject) => {
        reject();
      });
  }
}
