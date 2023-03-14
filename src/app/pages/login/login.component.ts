import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: FormGroup
  @ViewChild('psw') pswRef!: ElementRef;
  @ViewChild('text') textRef!: ElementRef;
  @ViewChild('icon') iconRef!: ElementRef;
  @ViewChild('message') msgRef!: ElementRef;

  constructor(private fb: FormBuilder, 
              private renderer: Renderer2,
              private authService: AuthService,
              private snackBar: MatSnackBar) {
    this.form = this.fb.group({
      email: ['kisst186@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.form.invalid) {
      var isLoggedIn = this.authService.login(this.form.value['email'], this.form.value['password'])

      if (!isLoggedIn) {
        this.snackBar.open('Email or password you entered is incorrect.', 'OK', {
          duration: 5000
        })
      }
    }
  }

  setVisibility(isVisible: boolean) {
    if (isVisible) {
      this.renderer.setAttribute(this.pswRef.nativeElement, 'type', 'text')
      this.renderer.setProperty(this.textRef.nativeElement, 'innerHTML', 'Hide')
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerHTML', 'visibility_off')
    } else {
      this.renderer.setAttribute(this.pswRef.nativeElement, 'type', 'password')
      this.renderer.setProperty(this.textRef.nativeElement, 'innerHTML', 'Show')
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerHTML', 'visibility')
    } 
  }
}
