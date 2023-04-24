import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { Item } from 'src/app/shared/models/item.model';
import { Shop } from 'src/app/shared/models/shop.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog/add-item-dialog.component';
import { AuthService } from 'src/app/services/auth.service';
import { Price } from 'src/app/shared/models/price.model';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  prices: Price[];
  shop: Shop;
  items: Item[];
  displayedColumns: string[] = ['id', 'name', 'price', 'rating'];
  dataSource = new MatTableDataSource([] as Item[]);
  @ViewChild(MatSort) sort!: MatSort;
  currentShopId: string | null;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.currentShopId = null;
    this.prices = [] as Price[];
    this.shop = {} as Shop;
    this.items = [] as Item[];
    this.setItems();
  }

  getAuthStatus() {
    return this.authService.getAuthStatus();
  }

  setItems() {
    this.shopService.getItems().subscribe(
      docs => {
        this.items = docs as Item[];
        this.setPrices();  
      }
    );
  }

  setPrices() {
    this.shopService.getPrices().subscribe(
      docs => {
        this.prices = docs as Price[];
        this.initShop();
      }
    );
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  initShop() {
    this.route.snapshot.paramMap.get('shop_id') != null
      ? this.currentShopId = this.route.snapshot.paramMap.get('shop_id')
      : this.currentShopId = ""
    var currentShopId = "";
    if (this.currentShopId != null) currentShopId = this.currentShopId

    var itemIdsByShop = this.prices
      .filter(price => price.shop_id == this.currentShopId)
      .map(price => price.item_id);
    this.setItemsInShop(itemIdsByShop);
    this.shopService.getShopById(currentShopId).subscribe(
      doc => {
        let shop = doc;
        if (shop.exists) this.shop = shop.data() as Shop;
      }
    );
    this.setItemsPriceByIds(currentShopId);
  }

  setItemsInShop(itemIdsByShop: string[]) {
    this.dataSource = new MatTableDataSource(this.items
      .filter(item => itemIdsByShop.includes(item.id) == true)
    );
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

  setItemsPriceByIds(shopId: string) {
    this.items.map(item => {
      const price = this.prices.find(price => price.item_id == item.id
        && price.shop_id == shopId);

      price != undefined
        ? item.price = price.price
        : item.price = 0;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddItemDialogComponent, {
      data: { currentShopId: this.currentShopId },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'VALID') {
        this.setPrices();
      }
    });
  }
}