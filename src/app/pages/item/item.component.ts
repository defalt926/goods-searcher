import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/item.model';
import { Price } from 'src/app/shared/models/price.model';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  item: Item;
  prices: Price[];
  lowestPrice: number;
  shopNames: Map<string, string>;


  constructor(
    private route: ActivatedRoute,
    private service: ItemsService
  ) {
    this.item = {} as Item;
    this.setItem();
    this.prices = [];
    this.lowestPrice = 0;
    this.shopNames = new Map;
    this.setPrices();
  }

  setItem() {
    var itemId = this.route.snapshot.paramMap.get('item_id');
    itemId != null ? itemId = itemId : itemId = "";

    this.service.getItemById(itemId).subscribe(
      doc => {
        let item = doc;
        if (item.exists) this.item = item.data() as Item;
      }
    );
  }

  setPrices() {
    var itemId = this.route.snapshot.paramMap.get('item_id');
    itemId != null ? itemId = itemId : itemId = "";
    this.setShopNames(itemId);

    this.service.getPrices().subscribe(
      docs => {
        let prices = docs as Price[];
        this.prices = prices.filter(price => price.item_id == itemId);
        
        this.lowestPrice = this.prices
          .filter(row => row.item_id == itemId)
          .map(item => item.price)
          .reduce((price_1, price_2) => Math.min(price_1, price_2));

        itemId != null ? itemId = itemId : itemId = "";
        this.setShopNames(itemId);
      }
    );
  }

  setShopNames(itemId: string) {
    const shopIdsByItem = this.prices
      .filter(price => price.item_id == itemId)
      .map(price => price.shop_id)
    
    for (const shopId of shopIdsByItem)
    this.service.getShopById(shopId).subscribe(
      doc => {
        let shop = doc;
        if (shop.exists) this.shopNames.set(shopId, (shop.data() as Shop).name);
      }
    );
  }

  getShopNameById(shopId: string) {
    return this.shopNames.get(shopId);
  }

  getItemDescription() {
    return this.item.description;
  }

  getItemRating() {
    return this.item.rating;
  }
}
