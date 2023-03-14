import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct } from '../../domain/cartProduct';

@Component({
  selector: 'li.caas-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {
  @Input() cartProduct: CartProduct = undefined;
  @Output() deleteFromCartEvent: EventEmitter<any> = new EventEmitter();
  @Output() updateQuantityEvent: EventEmitter<any> = new EventEmitter();
  
  selectedQuantity: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.selectedQuantity = this.cartProduct.quantity;
  }

  deleteFromCart() {
    this.deleteFromCartEvent.emit(this.cartProduct.id);
  }
  
  quantityChanged() {
    this.updateQuantityEvent.emit([this.cartProduct.id, this.selectedQuantity]);
  }
}
