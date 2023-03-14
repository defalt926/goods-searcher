import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ]
})
export class CategoriesModule { }
