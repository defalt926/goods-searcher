import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SubCategory } from 'src/app/shared/models/subcategory.model';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  subCategories: SubCategory[] = [];
  searchInput = "";

  constructor(
    private route: ActivatedRoute,
    private service: CategoriesService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.service.getSubCategories().subscribe(docs => {
      let subCategories = docs as SubCategory[];
      
      this.subCategories = subCategories
        .filter(subCategory => subCategory.cat_id == id)
        .sort((a: SubCategory, b: SubCategory) => a.name.localeCompare(b.name));
    });
  }
}
