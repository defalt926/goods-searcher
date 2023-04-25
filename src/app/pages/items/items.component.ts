import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/item.model';
import { Price } from 'src/app/shared/models/price.model';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items: Item[];
  filteredItems: Item[];
  searchInput: string;
  prices: Price[];
  lowestPrices: Map<string, number[]>;
  shops: Shop[];

  constructor(
    private route: ActivatedRoute,
    private service: ItemsService
  ) {
    this.items = [];
    this.filteredItems = [];
    this.searchInput = "";
    this.prices = [];
    this.lowestPrices = new Map;
    this.shops = [];
    this.setShops();
  }

  setShops() {
    this.service.getShops().subscribe(
      docs => {
        let shops = docs as Shop[];
        this.shops = shops;
        this.setPrices();
      }
    );
  }

  setPrices() {
    this.service.getPrices().subscribe(
      docs => {
        let prices = docs as Price[];
        this.prices = prices;
      }
    );
    this.setItems();
  }

  setItems() {
    var subCatId = this.route.snapshot.paramMap.get('id');
    subCatId != null ? subCatId = subCatId : subCatId = "0";

    if (subCatId == "0") {
      this.setItemsByName(
        this.route.snapshot.paramMap.get('name'),
        this.route.snapshot.queryParamMap.get('city')
      );
    } else {
      this.setItemsBySubCatId(subCatId);
    }
  }

  setItemsByName(name: string | null, city: string | null) {
    this.service.getItems().subscribe(
      docs => {
        this.items = docs as Item[];
        if (name != null && name != "") {
          if (city != "") {
            var shopsInCity = this.shops.filter(shop => shop.city == city);
            var itemsInShops = this.prices.filter(price => shopsInCity.some(shop => shop.id == price.shop_id));
            var itemsInCity = this.items.filter(item => itemsInShops.some(item2 => item2.item_id == item.id));
            this.items = itemsInCity.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
          } else {
            this.items = this.items.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
          }
        } else {
          if (city != "") {
            var shopsInCity = this.shops.filter(shop => shop.city == city);
            var itemsInShops = this.prices.filter(price => shopsInCity.some(shop => shop.id == price.shop_id));
            this.items = this.items.filter(item => itemsInShops.some(item2 => item2.item_id == item.id));
          }
        }
        this.filteredItems = this.items;
        this.setLowestPrices();
      }
    );
  }

  setItemsBySubCatId(subCatId: string) {
    this.service.getItems().subscribe(
      docs => {
        let items = docs as Item[];
        this.items = items.filter(subCategory => subCategory.subcat_id == subCatId)
        this.filteredItems = this.items;
        this.setLowestPrices();
      }
    );
  }

  searchItems() {
    if (this.searchInput != "") {
      this.filteredItems = this.items.filter(
        item => item.name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())
      );
    } else {
      this.filteredItems = this.items;
    }
  }

  setLowestPrices() {
    this.lowestPrices = this.prices.reduce((group: Map<string, number[]>, price) => {
      const { item_id } = price;
      const value = group.get(item_id);
      
      if (value != undefined) {
        value.push(price.price)
        group.set(item_id, value)
      } else {
        group.set(item_id, [price.price])
      }
      return group;
    }, new Map<string, number[]>);
  }

  getLowestPriceByItemId(item_id: string) {
    const prices = this.lowestPrices.get(item_id);
    if (prices) {
      return prices.reduce((price_1, price_2) => Math.min(price_1, price_2));
    } else {
      return 0;
    }
  }
}
