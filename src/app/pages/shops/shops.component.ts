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
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.css']
})
export class ShopsComponent {
  displayedColumns: string[];
  shops: MatTableDataSource<Shop>;
  @ViewChild(MatSort) sort!: MatSort;
  searchInput;

  constructor(
    private shopService: ShopService,
    private authService: AuthService,
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.displayedColumns = ['id', 'name', 'city', 'street'];
    this.shops = new MatTableDataSource;
    this.searchInput = "";
    this.setShops();
  }

  getAuthStatus() {
    return this.authService.getAuthStatus();
  }

  setShops() {
    this.shopService.getShops().subscribe(
      docs => {
        let shops = docs as Shop[];
        this.shops = new MatTableDataSource<Shop>(shops);
        this.shops.sort = this.sort;
      }
    );
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
        this.snackBar.open('Bolt hozzáadás sikeres.', 'OK', {
          duration: 5000
        });
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