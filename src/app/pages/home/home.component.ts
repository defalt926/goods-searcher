import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ItemsService } from 'src/app/services/items.service';
import { Category } from 'src/app/shared/models/category.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: Category[];
  searchInput = "";
  searchCity = "";
  cities = new Set;
  selected = "";

  constructor(itemsService: ItemsService,
              private firestore: AngularFirestore) {
    this.categories = [];
    this.firestore.collection("categories").valueChanges().subscribe(
      docs => {
        let categories = docs as Category[];
        this.categories = categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name))
      }
    );
    this.cities = itemsService.getCities();
  }

  selectCity(city: MatSelectChange) {
    this.searchCity = city.value;
  }
}
