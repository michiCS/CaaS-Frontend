import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { CartItemComponent } from "./cart-item/cart-item.component";
import { CartComponent } from "./cart/cart.component";
import { ProductListItemComponent } from "./product-list-item/product-list-item.component";
import { SearchComponent } from "./search/search.component";
import { ShopHeaderComponent } from "./shop-header/shop-header.component";
import { ShopProductsListComponent } from "./shop-products-list/shop-products-list.component";

const routes: Routes = [
    {
        path: "cart",
        component: CartComponent
    },
    {
        path: "products",
        component: ShopProductsListComponent
    }
]

@NgModule({
    declarations: [
        CartComponent,
        CartItemComponent,
        ProductListItemComponent,
        SearchComponent,
        ShopHeaderComponent,
        ShopProductsListComponent,
    ],
    imports: [
        CommonModule,
        SharedModule.forRoot(),
        RouterModule.forChild(routes)
    ],
    exports: [
        ShopHeaderComponent,
    ]
})
export class ShopModule { }