import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';
import { Item } from '../shared/models/item.model';
import { Price } from '../shared/models/price.model';
import { Shop } from '../shared/models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItemsById(subcat_id: string | null): Item[] {
    return CONST.items.filter(subCategory => subCategory.subcat_id == subcat_id);
  }

  getItemsByName(name: string | null, city: string | null): Item[] {
    if (name != null && name != "") {
      if (city != "") {
        var shopsInCity = CONST.shops.filter(shop => shop.city == city);
        var itemsInShops = CONST.prices.filter(price => shopsInCity.some(shop => shop.id == price.shop_id));
        var itemsInCity = CONST.items.filter(item => itemsInShops.some(item2 => item2.item_id == item.id));
        return itemsInCity.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
      } else {
        return CONST.items.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
      }
    } else {
      if (city != "") {
        var shopsInCity = CONST.shops.filter(shop => shop.city == city);
        var itemsInShops = CONST.prices.filter(price => shopsInCity.some(shop => shop.id == price.shop_id));
        return CONST.items.filter(item => itemsInShops.some(item2 => item2.item_id == item.id));
      } else {
        return CONST.items
      }
    }
  }

  getLowestPriceByItem(item_id: string): number {
    return CONST.prices
      .filter(row => row.item_id == item_id)
      .map(item => item.price)
      .reduce((price_1, price_2) => Math.min(price_1, price_2));
  }

  getItemById(item_id: string | null): Item {
    return CONST.items.filter(items => items.id == item_id)[0];
  }

  getPrices(item_id: string | null): Price[] {
    return CONST.prices.filter(row => row.item_id == item_id);
  }

  getShopNameById(shop_id: string): string {
    return CONST.shops.filter(shop => shop.id == shop_id)[0].name;
  }

  getDescriptionByItemId(item_id: string): string {
    return CONST.items.filter(item => item.id == item_id)[0].description;
  }

  getRatingByItemId(item_id: string): number {
    return CONST.items.filter(item => item.id == item_id)[0].rating;
  }

  getCities() {
    return new Set(CONST.shops.map(shop => shop.city))
  }
}
