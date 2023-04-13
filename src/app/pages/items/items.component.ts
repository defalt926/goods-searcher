import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ItemsService } from 'src/app/services/items.service';
import { Item } from 'src/app/shared/models/item.model';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent {
  items: Item[] = [];
  searchInput = "";

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ItemsService
  ) {}

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('id') == "0") {
      this.items = this.service.getItemsByName(this.route.snapshot.paramMap.get('name'),
                                          this.route.snapshot.queryParamMap.get('city'));
    } else {
      this.items = this.service.getItemsById(this.route.snapshot.paramMap.get('id'));
    }
  }

  public getPrice(item_id: string): number {
    return this.service.getLowestPriceByItem(item_id);
  }
}
