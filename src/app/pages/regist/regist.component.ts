import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RegistService } from 'src/app/services/regist.service';
import { User } from "src/app/shared/models/user.model"

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  form: FormGroup;
  users: User[];

  constructor(private fb: FormBuilder,
              private registService: RegistService,
              private snackBar: MatSnackBar,
              private router: Router,
              private auth: Auth) {
    this.form = this.fb.group({
      firstName: ['Tamás', Validators.required],
      lastName: ['Kiss', Validators.required],
      email: ['kisst186@gmail.com', [Validators.required, Validators.email]],
      password: ['Test1234', Validators.required],
      password2: ['Test1234', Validators.required],
    }, {validators: this.checkPasswords});
    this.users = [];
  }
  
  regist() {
    let form = this.form

    if (form.valid) {
      const user = {
        auth_uid: '',
        first_name: form.value['firstName'],
        last_name: form.value['lastName'],
        email: form.value['email'],
      } as User

      this.registService.addUser(form.value['email'], form.value['password'])
        .then((user_res) => {
          user.auth_uid = user_res.user.uid;
          this.registService.addUserToFireStore(user)
            .catch(() => {
              this.snackBar.open('Adatbázis nem érhető el', 'OK', {
                duration: 5000
              });
            })
        })
        .catch((err) => {
          this.snackBar.open('Hiba a regisztráció során', 'OK', {
            duration: 5000
          });
        })
    }
  }

  checkPasswords(control: AbstractControl) {
    const password = control.value['password'];
    const password2 = control.value['password2'];
    const passwordValid = password === password2;
    return !passwordValid ? {passwordValid: false} : null;
  }
}
