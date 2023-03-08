import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private fb: FormBuilder, 
              private renderer: Renderer2,
              ) {
    this.form = this.fb.group({
      email: ['kisst186@gmail.com', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  login() {
    console.log("login")
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
