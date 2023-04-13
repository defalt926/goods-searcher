import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ItemsService } from 'src/app/services/items.service';
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
  searchCity = "";
  cities = new Set;

  constructor(itemsService: ItemsService) {
    this.cities = itemsService.getCities();
  }

  selectCity(city: MatSelectChange) {
    this.searchCity = city.value;
  }
}
