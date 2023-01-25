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
}
