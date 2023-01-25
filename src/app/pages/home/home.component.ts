import { Component } from '@angular/core';
import { CONST } from 'src/app/shared/constants';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: Category[] = CONST.categories;
  searchInput = "";
}
