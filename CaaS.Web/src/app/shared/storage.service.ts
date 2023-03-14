import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private CART_ID: string = "animalPhotoShop_cartId";

  saveCartId(cartId: number): void {
    localStorage.setItem(this.CART_ID, cartId.toString());
  }

  getCartId(): number {

    return +(localStorage.getItem(this.CART_ID));
  }
  
  deleteCartId(): void {
    localStorage.removeItem(this.CART_ID);
  }
}
