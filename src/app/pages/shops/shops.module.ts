import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShopsRoutingModule } from './shops-routing.module';
import { ShopsComponent } from './shops.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
    ShopsComponent
  ],
  imports: [
    CommonModule,
    ShopsRoutingModule,
    MatCardModule
  ]
})
export class ShopsModule { }
