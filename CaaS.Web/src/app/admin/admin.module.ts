import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { AdminApiModule } from "./admin-api.module";
import { AdminComponent } from "./admin/admin.component";
import { CanNavigateToAdminGuard } from "./can-navigate-to-admin.guard";
import { DiscountManagementComponent } from "./discount-management/discount-management.component";
import { LoginComponent } from "./login/login.component";
import { ProductManagementComponent } from "./product-management/product-management.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { TenantManagementComponent } from "./tenant-management/tenant-management.component";

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        canActivate: [CanNavigateToAdminGuard]
    },
    {
        path: "login",
        component: LoginComponent
    }
]

@NgModule({
    declarations: [
        AdminComponent,
        DiscountManagementComponent,
        LoginComponent,
        ProductManagementComponent,
        StatisticsComponent,
        TenantManagementComponent
    ],
    imports: [
        CommonModule,
        AdminApiModule,
        SharedModule,
        RouterModule.forChild(routes)
    ]
})
export class AdminModule { }