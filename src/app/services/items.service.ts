import { Injectable } from '@angular/core';
import { Item } from '../shared/models/item.model';
import { Price } from '../shared/models/price.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Shop } from '../shared/models/shop.model';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private firestore: AngularFirestore) { }

  getItems() {
    return this.firestore.collection<Item>('items').valueChanges();
  }

  getItemById(itemId: string) {
    return this.firestore.collection<Item>('items').doc(itemId).get();
  }

  getPrices() {
    return this.firestore.collection<Price>('prices').valueChanges();
  }

  getShopById(shop_id: string) {
    return this.firestore.collection<Shop>('shops').doc(shop_id).get();
  }

  getShops() {
    return this.firestore.collection<Shop>('shops').valueChanges();
  }

  getCities() {
    return this.firestore.collection("shops").valueChanges();
  }
}
