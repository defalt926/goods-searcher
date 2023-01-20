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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ItemsService
  ) {}

   ngOnInit() {
    this.items = this.service.getItems(this.route.snapshot.paramMap.get('id'))
    console.log(this.items)
  }
}
