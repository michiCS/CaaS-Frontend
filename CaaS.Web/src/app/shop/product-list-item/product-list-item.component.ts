import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../domain/product';

@Component({
  selector: 'caas-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css']
})
export class ProductListItemComponent {
  @Input() product: Product;
  @Output() addToCartEvent: EventEmitter<any> = new EventEmitter();

  addToCart(): void {
    this.addToCartEvent.emit(this.product.id);
  }
}
