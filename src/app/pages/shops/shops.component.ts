import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent {
  shop: Shop = {} as Shop;

  constructor(
    private route: ActivatedRoute,
    private service: ShopService,
  ) {}

  ngOnInit() {
    this.shop = this.service.getShopById(this.route.snapshot.paramMap.get('shop_id'));
  }
}
