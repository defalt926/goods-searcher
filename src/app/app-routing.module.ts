import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './pages/home/home.module';
import { HomeComponent } from './pages/home/home.component';
import { CategoriesModule } from './pages/categories/categories.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { ItemsModule } from './pages/items/items.module';
import { ItemsComponent } from './pages/items/items.component';
import { ItemModule } from './pages/item/item.module';
import { ItemComponent } from './pages/item/item.component';
import { ShopsModule } from './pages/shops/shops.module';
import { ShopsComponent } from './pages/shops/shops.component';
import { RegistModule } from './pages/regist/regist.module';
import { RegistComponent } from './pages/regist/regist.component';
import { LoginModule } from './pages/login/login.module';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'items/:id', component: ItemsComponent },
  { path: 'items/:id/:name', component: ItemsComponent },
  { path: 'categories/:id', component: CategoriesComponent },
  { path: 'item/:item_id', component: ItemComponent },
  { path: 'shop/:shop_id', component: ShopsComponent },
  { path: 'regist', component: RegistComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
