import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemsRoutingModule } from './items-routing.module';
import { ItemsComponent } from './items.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ItemsComponent
  ],
  imports: [
    CommonModule,
    ItemsRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    FormsModule
  ],
  exports: [
    
  ]
})
export class ItemsModule { }
