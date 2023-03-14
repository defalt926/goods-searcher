import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemRoutingModule } from './item-routing.module';
import { ItemComponent } from './item.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';



@NgModule({
  declarations: [
    ItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatDividerModule
  ]
})
export class ItemModule { }
