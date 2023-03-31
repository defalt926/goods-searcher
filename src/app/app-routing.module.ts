import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'items/:id',
    loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule)
  },
  {
    path: 'items/:id/:name',
    loadChildren: () => import('./pages/items/items.module').then(m => m.ItemsModule)
  },
  {
    path: 'categories/:id',
    loadChildren: () => import('./pages/categories/categories.module').then(m => m.CategoriesModule)
  },
  {
    path: 'item/:item_id',
    loadChildren: () => import('./pages/item/item.module').then(m => m.ItemModule)
  },
  {
    path: 'shop/:shop_id',
    loadChildren: () => import('./pages/shop/shop.module').then(m => m.ShopModule)
  },
  {
    path: 'shops',
    loadChildren: () => import('./pages/shops/shops.module').then(m => m.ShopsModule)
  },
  {
    path: 'regist',
    loadChildren: () => import('./pages/regist/regist.module').then(m => m.RegistModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfileModule),
    canActivate: [AuthGuard]
  },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
