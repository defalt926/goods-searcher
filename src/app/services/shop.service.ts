import { Injectable } from '@angular/core';
import { Shop } from '../shared/models/shop.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Price } from '../shared/models/price.model';
import { Item } from '../shared/models/item.model';

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

  getShops() {
    return this.firestore.collection("shops").valueChanges();
  }

  addShop(shop: Shop) {
    const newId = this.firestore.createId();
    return this.firestore.collection("shops").doc(newId).set({
      id: newId,
      name: shop.name,
      city: shop.city,
      street: shop.street,
    });
  }

  getPrices() {
    return this.firestore.collection<Price>("prices").valueChanges();
  }

  getShopById(shop_id: string){
    return this.firestore.collection<Shop>('shops').doc(shop_id).get();
  }

  getItems() {
    return this.firestore.collection("items").valueChanges();
  }
  
  createDocId() {
    return this.firestore.createId();
  }

  addItem(item: Item) {
    return this.firestore.collection("items").doc(item.id).set({
      id: item.id,
      cat_id: item.cat_id,
      subcat_id: item.subcat_id,
      name: item.name,
      description: item.description,
      price: item.price,
      rating: item.rating
    });
  }

  addPrice(price: Price) {
    const newId = this.firestore.createId();
    return this.firestore.collection("prices").doc(newId).set({
      shop_id: price.shop_id,
      item_id: price.item_id,
      price: price.price
    });
  }
}
