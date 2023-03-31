import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { CONST } from 'src/app/shared/constants';
import { User } from "src/app/shared/models/user.model"

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      firstName: ['Tamás', Validators.required],
      lastName: ['Kiss', Validators.required],
      email: ['asd@asd.asd', [Validators.required, Validators.email]],
      password: ['asd', Validators.required],
      password2: ['asd', Validators.required],
    }, {validators: this.checkPasswords});
  }
  
  regist() {
    let form = this.form

    if (form.valid) {
      if (CONST.users.every(user => user.email !== form.value['email'])) {
        CONST.users.push({
          id: CONST.users.length.toString(),
          first_name: form.value['firstName'] ? form.value['firstName'] : '',
          last_name: form.value['lastName'] ? form.value['lastName'] : '',
          email: form.value['email'] ? form.value['email'] : '',
          password: form.value['password'] ? form.value['password'] : '',
          is_suspended: false} as User)
      }
    }
    console.log(CONST.users)
  }

  checkPasswords(control: AbstractControl) {
    const password = control.value['password'];
    const password2 = control.value['password2'];
    const passwordValid = password === password2;
    return !passwordValid ? {passwordValid: false} : null;
  }
}
