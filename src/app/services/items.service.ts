import { Injectable } from '@angular/core';
import { CONST } from '../shared/constants';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor() { }

  getItems(id: string | null) {
    return CONST.items.filter(subCategory => subCategory.subcat_id == id)
  }
}
