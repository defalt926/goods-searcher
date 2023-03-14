import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistRoutingModule } from './regist-routing.module';
import { RegistComponent } from './regist.component';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    RegistComponent
  ],
  imports: [
    CommonModule,
    RegistRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule
  ]
})
export class RegistModule { }
