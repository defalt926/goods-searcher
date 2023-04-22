import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { AuthService } from 'src/app/services/auth.service';
import { Shop } from 'src/app/shared/models/shop.model';
import { MatTableDataSource } from '@angular/material/table';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { AddShopDialogComponent } from './add-shop-dialog/add-shop-dialog.component';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent {
  displayedColumns: string[] = ['id', 'name', 'city', 'street'];
  shops = new MatTableDataSource([] as Shop[]);
  @ViewChild(MatSort) sort!: MatSort;
  searchInput = "";

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog
  ) {
    this.setShops();
  }

  getAuthStatus() {
    return this.authService.getAuthStatus();
  }

  setShops() {
    this.shopService.getShops().subscribe(
      docs => {
        let shops = docs as Shop[];
        this.shops = new MatTableDataSource(shops);
      }
    );
  }

  ngAfterViewInit() {
    this.shops.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  goToShopDetails(shop_id: string) {
    this.router.navigateByUrl('shop/' + shop_id);
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddShopDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'VALID') {
        this.setShops();
      }
    });
  }

  searchShops() {
    if (this.searchInput != "") {
      this.shopService.getShops().subscribe(
        docs => {
          let shops = docs as Shop[];
          shops = shops.filter(
            shop => shop.city.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())
              || shop.name.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())
              || shop.street.toLocaleLowerCase().includes(this.searchInput.toLocaleLowerCase())
          );
          this.shops = new MatTableDataSource(shops);
        }
      );
    } else {
      this.setShops();
    }
  }
}