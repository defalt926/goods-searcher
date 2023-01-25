import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsComponent } from './shops.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class ShopsModule { }
