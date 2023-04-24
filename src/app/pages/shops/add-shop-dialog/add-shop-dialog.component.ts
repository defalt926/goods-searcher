import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ShopService } from 'src/app/services/shop.service';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-add-shop-dialog',
  templateUrl: './add-shop-dialog.component.html',
  styleUrls: ['./add-shop-dialog.component.css']
})
export class AddShopDialogComponent {
  form: FormGroup;
  shops: Shop[];

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddShopDialogComponent>,
              private snackBar: MatSnackBar,
              private shopService: ShopService) {
    this.form = this.fb.group({
      name: ['Lidl', Validators.required],
      city: ['Esztergom', Validators.required],
      street: ['Külső Bánomi út 10', Validators.required],
    });
    this.shops = [] as Shop[];
    this.setShops();
  }

  setShops() {
    this.shopService.getShops().subscribe(
      docs => {
        let shops = docs as Shop[];
        this.shops = shops;
      }
    );
  }

  addShop() {
    let form = this.form

    if (form.valid) {
      if (this.shops.every(shop => shop.name !== form.value['name']
          && shop.city !== form.value['city']
          && shop.street !== form.value['street'])) {

        this.shopService.addShop({
          name: form.value['name'],
          city: form.value['city'],
          street: form.value['street']
        } as Shop)
          .then((res) => {
            this.dialogRef.close('VALID');
          })
          .catch((err) => {
            this.snackBar.open('Nem sikerült hozzáadni a boltot.', 'OK', {
              duration: 5000
            });
          });
      } else {
        this.snackBar.open('Létezik már ilyen bolt.', 'OK', {
          duration: 5000
        });
      }
    }
  }
}
