import { Component, } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CONST } from 'src/app/shared/constants';
import { Shop } from 'src/app/shared/models/shop.model';

@Component({
  selector: 'app-add-shop-dialog',
  templateUrl: './add-shop-dialog.component.html',
  styleUrls: ['./add-shop-dialog.component.css']
})
export class AddShopDialogComponent {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<AddShopDialogComponent>) {
    this.form = this.fb.group({
      name: ['Lidl', Validators.required],
      city: ['Esztergom', Validators.required],
      street: ['Külső Bánomi út 10', Validators.required],
    });
  }

  addShop() {
    let form = this.form

    if (form.valid) {
      if (CONST.shops.every(shop => shop.name !== form.value['name']
          && shop.city !== form.value['city']
          && shop.street !== form.value['street'])) {

        CONST.shops.push({
          id: (CONST.shops.length + 1).toString(),
          name: form.value['name'],
          city: form.value['city'],
          street: form.value['street']} as Shop
        )
        this.dialogRef.close('VALID')
      }
    }
  }
}
