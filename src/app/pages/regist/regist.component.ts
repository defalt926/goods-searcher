import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms'
import { CONST } from 'src/app/shared/constants';
import { User } from "src/app/shared/models/user.model"

@Component({
  selector: 'app-regist',
  templateUrl: './regist.component.html',
  styleUrls: ['./regist.component.css']
})
export class RegistComponent {
  userRegistForm = new FormGroup({
    firstName: new FormControl('asd', Validators.required),
    lastName: new FormControl('asd', Validators.required),
    email: new FormControl('asd@asd.asd', [Validators.required, Validators.email]),
    password: new FormControl('asd', Validators.required),
    password2: new FormControl('asd', Validators.required),
  }, {validators: this.checkPasswords});
  
  onSubmit() {
    let form = this.userRegistForm

    if (form.valid) {
      if (CONST.users.every(user => user.email !== form.value['email'])) {
        CONST.users.push({
          id: CONST.users.length.toString(),
          first_name: form.value['firstName'] ? form.value['firstName'] : '',
          last_name: form.value['lastName'] ? form.value['lastName'] : '',
          email: form.value['email'] ? form.value['email'] : '',
          password: form.value['password'] ? form.value['password'] : ''} as User)
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
