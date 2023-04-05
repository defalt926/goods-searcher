import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from 'src/app/services/shop.service';
import { CONST } from 'src/app/shared/constants';
import { Category } from 'src/app/shared/models/category.model';
import { Item } from 'src/app/shared/models/item.model';
import { Price } from 'src/app/shared/models/price.model';
import { SubCategory } from 'src/app/shared/models/subcategory.model';

@Component({
  selector: 'app-add-item-dialog',
  templateUrl: './add-item-dialog.component.html',
  styleUrls: ['./add-item-dialog.component.css']
})
export class AddItemDialogComponent {
  form: FormGroup;
  categories: Category[];
  subCategories: SubCategory[];
  ;

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private dialogRef: MatDialogRef<AddItemDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { currentShopId: string},
              private shopService: ShopService) {
    this.form = this.fb.group({
      category: ['', Validators.required],
      subCategory: new FormControl({value: '', disabled: true}, Validators.required),
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, Validators.required],
    });
    this.categories = CONST.categories;
    this.subCategories = CONST.subCategories;
  }

  addItem() {
    let form = this.form;

    if (form.valid) {
      

      if (!this.shopService.isItemExistInShop(this.data.currentShopId, form.value['name'])) {
        var itemId: string | undefined = (CONST.items.length + 1).toString();
        if (!this.shopService.isItemExistInItems(form.value['name'])) {
          CONST.items.push({
            id: itemId,
            cat_id: form.value['category'],
            subcat_id: form.value['subCategory'],
            name: form.value['name'],
            description: form.value['description'],
            rating: 0
          } as Item)
        } else {
          itemId = this.shopService.getItemIdByItemName(form.value['name']);
        }

        CONST.prices.push({
          shop_id: this.data.currentShopId,
          item_id: itemId,
          price: form.value['price']
        } as Price);
        this.dialogRef.close('VALID')
      }
    }
  }

  selectCategory(category: MatSelectChange) {
    this.form.controls['subCategory'].enable();
    this.subCategories = CONST.subCategories.filter(subCategory => subCategory.cat_id == category.value);
  }
}
