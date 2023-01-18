import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor() { }

  getSubCategory(id: string | null) {
    return CONST.subCategories.filter(category => category.cat_id == id)
  }
}
