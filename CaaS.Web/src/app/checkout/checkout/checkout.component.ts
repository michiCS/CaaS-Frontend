import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { iif } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../../domain/cart';
import { Customer } from '../../domain/customer';
import { ShopService } from '../../shared/shop.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'caas-checkout',
  templateUrl: './checkout.component.html',
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {

  alreadyCustomer: boolean = false;
  customer: Customer = { }

  cart: Cart = {};
  cartId: number = undefined;

  constructor(
    private route: ActivatedRoute, 
    private shopService: ShopService, 
    private router: Router,
    private storageService: StorageService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.customer.tenantId = environment.tenantId;
    this.cartId = this.storageService.getCartId();
    this.shopService.getCart(this.cartId).subscribe(res => {
      this.cart = res;
    });
  }

  checkout(): void {
    iif(
      () => !this.alreadyCustomer,
      this.shopService.createCustomer(this.customer),
      this.shopService.getCustomer(this.customer.email, environment.tenantId)
    ).subscribe(res => {
      if(!(res instanceof HttpErrorResponse)) {
        this.createOrder(res.id);
        this.storageService.deleteCartId();
      } else {
        this.messageService.add({ severity: "error", summary: "Customer not found",
        detail: `Creating customer failed or given Email does not belong to a customer` });
      }
    }) 
  }

  private createOrder(customerId: number): void {
    this.shopService.createOrder(this.cart.id, customerId).subscribe(res => {
      if(res.id) {
        this.router.navigate([`./order/${res.id}`], {relativeTo: this.route.parent});
      } else {
        this.messageService.add({ severity: "error", summary: "Create Order failed",
        detail: `Order could not get created. Clear your Cart and try again!` });
      }
    })
  }
}
