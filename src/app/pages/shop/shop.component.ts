import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { CONST } from 'src/app/shared/constants';
import { Item } from 'src/app/shared/models/item.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  authService: AuthService = {} as AuthService;
  shop: Shop = {} as Shop;
  displayedColumns: string[] = ['id', 'name', 'price', 'rating'];
  dataSource = new MatTableDataSource([] as Item[]);
  @ViewChild(MatSort) sort!: MatSort;
  currentShopId: string | null;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.authService = authService;
    this.currentShopId = null;
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  ngOnInit() {
    this.currentShopId = this.route.snapshot.paramMap.get('shop_id');
    var itemIdsByShop = CONST.prices
      .filter(price => price.shop_id == this.currentShopId)
      .map(price => price.item_id);
    this.shop = this.shopService.getShopById(this.currentShopId);
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
    return this.shopService.getItemPriceByIds(shop_id, item_id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { currentShopId: this.currentShopId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'VALID') {
        var currentShopId = this.route.snapshot.paramMap.get('shop_id');
        var itemIdsByShop = CONST.prices
          .filter(price => price.shop_id == currentShopId)
          .map(price => price.item_id);
        this.shop = this.shopService.getShopById(currentShopId);
        this.dataSource = new MatTableDataSource(CONST.items.filter(item => itemIdsByShop.includes(item.id) == true));
      }
    });
  }
}