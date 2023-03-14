import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CheckoutItemComponent } from "./checkout-item/checkout-item.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { OrderItemComponent } from "./order-item/order-item.component";
import { OrderComponent } from "./order/order.component";
import { SharedModule } from "../shared/shared.module";

const routes: Routes = [
    {
        path: '',
        component: CheckoutComponent,
    },
    {
        path: "order/:id",
        component: OrderComponent
    },
]

@NgModule({
    declarations: [
        CheckoutComponent,
        CheckoutItemComponent,
        OrderComponent,
        OrderItemComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class CheckoutModule { }