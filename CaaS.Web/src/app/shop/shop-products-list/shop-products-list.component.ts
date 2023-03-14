import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { iif, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartProductForCreation } from '../../domain/cartProductForCreation';
import { Product } from '../../domain/product';
import { ShopService } from '../../shared/shop.service';
import { StorageService } from '../../shared/storage.service';

@Component({
  selector: 'caas-shop-products-list',
  templateUrl: './shop-products-list.component.html',
  providers: [MessageService]
})
export class ShopProductsListComponent implements OnInit {

  tenantId: number = undefined;
  products: Product[] = [];
  totalCount: number = 0;
  limit: number = 12;

  constructor(
    private shopService: ShopService,
    private storageService: StorageService,
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.tenantId = environment.tenantId;
    this.shopService.getProductsCount(this.tenantId).subscribe(res => {
      this.totalCount = res;
    })
    this.loadProducts(0);
  }

  loadProducts(offset): void {
    this.shopService.getProductsPagination(this.tenantId, this.limit, offset).subscribe(res => {
      this.products = res;
    })
  }

  addProductToCart(productId: number): void {
    let cartId = this.storageService.getCartId();
    iif(
      () => !cartId,
      this.shopService.createCart(this.tenantId),
      of({})
    ).subscribe(res => {
      if (res["id"]) {
        cartId = res["id"];
        this.storageService.saveCartId(cartId);
      }

      const cartProduct: CartProductForCreation = {
        cartId: cartId,
        quantity: 1,
        productId: productId
      };

      this.shopService.addProductToCart(cartProduct).subscribe(res => {
        if (!(res instanceof HttpErrorResponse)) {
          const productAddedMessage = $localize`:@@product-added-message:Product with id ${cartProduct.productId} was added to the cart`
          this.messageService.add({
            severity: "success", summary: "Added to Cart"
            , detail: productAddedMessage
          })
        }
      })
    })
  }

  searchProducts(event): void {
    const searchTerm = event;
    if (searchTerm.length === 0) {
      return this.loadProducts(0);
    }
    this.shopService.searchProducts(this.tenantId, searchTerm).subscribe(res => {
      this.products = res;
    })
  }

  paginate(event): void {
    const offset = this.limit * event.page;
    this.loadProducts(offset);
    window.scrollTo(0, 0);
  }
}
