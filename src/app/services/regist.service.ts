import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from '../shared/models/user.model';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';


@Injectable({
  providedIn: 'root'
})
export class RegistService {

  constructor(private firestore: AngularFirestore,
              private auth: Auth) { }

  addUser(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  addUserToFireStore(user: User) {
    const newId = this.firestore.createId();
    return this.firestore.collection("users").doc(newId).set({
      id: newId,
      auth_uid: user.auth_uid,
      first_name: user.first_name,
      last_name: user.last_name, 
      email: user.email,
      is_suspended: false
    });
  }
}
