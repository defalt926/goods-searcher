import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';
import { Shop } from '../shared/models/shop.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private firestore: AngularFirestore) { }

  getCategories() {
    return this.firestore.collection("categories").valueChanges();
  }

  getSubCategories() {
    return this.firestore.collection("subCategories").valueChanges();
  }

  getShopById(shop_id: string | null): Shop {
    return CONST.shops.filter(shop => shop.id == shop_id)[0];
  }

  getItemPriceByIds(shop_id: string, item_id: string): number {
    return CONST.prices.filter(item => item.shop_id == shop_id && item.item_id == item_id)[0].price;
  }

  isItemExistInItems(itemName: string) {
    return CONST.items.some(item => item.name == itemName);
  }

  isItemExistInShop(shopId: string, itemName: string) {
    return CONST.prices.some(price => price.shop_id == shopId
      && price.item_id == this.getItemIdByItemName(itemName));
  }

  getItemIdByItemName(itemName: string) {
    return CONST.items.find(item => item.name == itemName)?.id;
  }
}
