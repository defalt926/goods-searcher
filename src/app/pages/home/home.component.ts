import { Component } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { ItemsService } from 'src/app/services/items.service';
import { Category } from 'src/app/shared/models/category.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  categories: Category[];
  searchInput = "";
  searchCity = "";
  cities: Set<string>;
  selected = "";

  constructor(private itemsService: ItemsService,
              private firestore: AngularFirestore) {
    this.categories = [];
    this.firestore.collection("categories").valueChanges().subscribe(
      docs => {
        let categories = docs as Category[];
        this.categories = categories.sort((a: Category, b: Category) => a.name.localeCompare(b.name))
      }
    );
    this.cities = new Set
    this.setCities();
  }

  selectCity(city: MatSelectChange) {
    this.searchCity = city.value;
  }

  setCities() {
    this.itemsService.getCities().subscribe(
      docs => {
        let shops = docs as Shop[];
        this.cities = new Set(shops.map(shop => shop.city));
      }
    );
  }
}
