import { Component, Input, OnInit } from '@angular/core';
import { CartProduct } from '../../domain/cartProduct';

@Component({
  selector: 'li.caas-checkout-item',
  templateUrl: './checkout-item.component.html'
})
export class CheckoutItemComponent  {
  @Input() cartProduct: CartProduct = undefined;
}
