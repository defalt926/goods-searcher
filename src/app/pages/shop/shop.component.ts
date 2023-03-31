import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { CONST } from 'src/app/shared/constants';
import { Item } from 'src/app/shared/models/item.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import {MatSort, Sort} from '@angular/material/sort';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  shop: Shop = {} as Shop;
  displayedColumns: string[] = ['id', 'name', 'price', 'rating'];
  dataSource = new MatTableDataSource([] as Item[]);
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private route: ActivatedRoute,
    private service: ShopService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router
  ) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    var currentShopId = this.route.snapshot.paramMap.get('shop_id');
    var itemIdsByShop = CONST.prices
      .filter(price => price.shop_id == currentShopId)
      .map(price => price.item_id);
    this.shop = this.service.getShopById(currentShopId);
    this.dataSource = new MatTableDataSource(CONST.items.filter(item => itemIdsByShop.includes(item.id) == true));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToItemDetails(item_id: string) {
    this.router.navigateByUrl('item/' + item_id);
  }

  getItemPriceByIds(shop_id: string, item_id: string) {
    return this.service.getItemPriceByIds(shop_id, item_id);
  }
}