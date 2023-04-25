import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
              private snackBar: MatSnackBar,
              private router: Router) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.form.invalid) {
      this.authService.login(this.form.value['email'], this.form.value['password'])
        .then((res) => {
          res.user.getIdToken()
            .then((res2) => {
              this.router.navigateByUrl('home');
            });
        })
        .catch((err) => {
          this.snackBar.open('Az email vagy jelszó nem egyezik meg.', 'OK', {
            duration: 5000
          });
        });
    }
  }

  setVisibility(isVisible: boolean) {
    if (isVisible) {
      this.renderer.setAttribute(this.pswRef.nativeElement, 'type', 'text')
      this.renderer.setProperty(this.textRef.nativeElement, 'innerHTML', 'Elrejt')
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerHTML', 'visibility_off')
    } else {
      this.renderer.setAttribute(this.pswRef.nativeElement, 'type', 'password')
      this.renderer.setProperty(this.textRef.nativeElement, 'innerHTML', 'Mutat')
      this.renderer.setProperty(this.iconRef.nativeElement, 'innerHTML', 'visibility')
    } 
  }
}
