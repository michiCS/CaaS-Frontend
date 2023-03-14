import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iif, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cart } from '../../domain/cart';
import { ShopService } from '../../shared/shop.service';
import { StorageService } from '../../shared/storage.service';


@Component({
  selector: 'caas-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {

  cart: Cart = undefined;
  cartId: number = undefined;

  constructor(
    private route: ActivatedRoute,
    private shopService: ShopService,
    private router: Router,
    private storageService: StorageService) {
  }

  ngOnInit(): void {
    this.cartId = this.storageService.getCartId();
    iif(
      () => !this.cartId,
      this.shopService.createCart(environment.tenantId),
      of({}) 
    ).subscribe(res => {
      if (res["id"]) {
        this.cartId = res["id"];
        this.storageService.saveCartId(res["id"]);
      }
      this.loadData();
    })
  }

  loadData(): void {
    if (this.cartId) {
      this.shopService.getCart(this.cartId).subscribe(res => {
        this.cart = res;
      });
    }
  }

  updateQuantity(data): void {
    const [cartProductId, quantity] = data;
    this.shopService.updateQuantity({ id: cartProductId, quantity: quantity }).subscribe(res => {
      this.loadData();
    })
  }

  deleteCartProduct(cartProductId: number): void {
    this.shopService.deleteCartProduct(cartProductId).subscribe(res => {
      this.loadData();
    })
  }

  clearCart(): void {
    this.shopService.clearCart(this.cartId).subscribe(res => {
      this.cart = undefined;
    })
  }

  navigateToCheckout(): void {
    this.router.navigate(["./checkout/"], { relativeTo: this.route.parent });
  }
}


