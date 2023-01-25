import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';
import { Item } from '../shared/models/item.model';
import { Price } from '../shared/models/price.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItemsById(subcat_id: string | null): Item[] {
    return CONST.items.filter(subCategory => subCategory.subcat_id == subcat_id);
  }

  getItemsByName(name: string | null): Item[] {
    if(name != null) {
      return CONST.items.filter(item => item.name.toLocaleLowerCase().includes(name.toLocaleLowerCase()));
    } else {
      return [];
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
}
