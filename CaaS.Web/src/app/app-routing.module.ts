import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './shop/cart/cart.component';
import { ShopProductsListComponent } from './shop/shop-products-list/shop-products-list.component';
import { CustomPreloadingStrategy } from './custom-preloading.strategy';

const routes: Routes = [
  {
    path: "shop",
    children: [
      {
        path: "products",
        component: ShopProductsListComponent
      },
      {
        path: "cart",
        component: CartComponent
      },
      {
        path: "checkout",
        loadChildren: () => import('./checkout/checkout.module')
          .then(m => m.CheckoutModule),
        data: {
          preload: true
        }
      },
      {
        path: "admin",
        loadChildren: () => import('./admin/admin.module')
          .then(m => m.AdminModule)
      },
      {
        path: "",
        redirectTo: "products",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "index.html",
    redirectTo: "shop/products",
    pathMatch: "full"
  },
  {
    path: "",
    redirectTo: "shop",
    pathMatch: "full"
  },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: CustomPreloadingStrategy })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
