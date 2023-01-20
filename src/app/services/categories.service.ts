import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor() { }

  getSubCategories(id: string | null) {
    return CONST.subCategories.filter(category => category.cat_id == id)
  }
}
