import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';
import { Shop } from '../shared/models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor() { }

  getShopById(shop_id: string | null): Shop {
    return CONST.shops.filter(shop => shop.id == shop_id)[0];
  }

  getItemPriceByIds(shop_id: string, item_id: string): number {
    return CONST.prices.filter(item => item.shop_id == shop_id && item.item_id == item_id)[0].price;
  }
}
