import { Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, ObservableInput } from 'rxjs';
import { switchMap } from 'rxjs/operators'
import { CategoryService } from 'src/app/services/category.service';
import { CONST } from 'src/app/shared/constants';
import { Category } from 'src/app/shared/models/category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent {
  categories$: ObservableInput<any> | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: CategoryService
  ) {}

  ngOnInit() {
    console.log(this.service.getSubCategory(this.route.snapshot.paramMap.get('id')))
    
    console.log(this.categories$)   
  }
}
