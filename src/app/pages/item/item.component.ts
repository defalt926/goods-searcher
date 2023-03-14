import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/item.model';
import { Price } from 'src/app/shared/models/price.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  item: Item = {} as Item;
  prices: Price[] = [];

  constructor(
    private route: ActivatedRoute,
    private service: ItemsService
  ) {}

  ngOnInit() {
    this.item = this.service.getItemById(this.route.snapshot.paramMap.get('item_id'));
    this.prices = this.service.getPrices(this.route.snapshot.paramMap.get('item_id'));
  }

  public getPrice(item_id: string): number {
    return this.service.getLowestPriceByItem(item_id);
  }

  public getShopNameById(shop_id: string): string {
    return this.service.getShopNameById(shop_id);
  }

  public getDescriptionByItemId(item_id: string): string {
    return this.service.getDescriptionByItemId(item_id);
  }

  public getRatingByItemId(item_id: string): number {
    return this.service.getRatingByItemId(item_id);
  }
}
