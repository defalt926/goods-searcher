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
    private router: Router,
    private service: CategoriesService
  ) {}

  ngOnInit() {
    this.subCategories = this.service.getSubCategories(this.route.snapshot.paramMap.get('id'));
  }
}
