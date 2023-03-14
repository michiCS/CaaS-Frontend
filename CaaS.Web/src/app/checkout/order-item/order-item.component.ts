import { Component, Input } from '@angular/core';
import { OrderProduct } from '../../domain/orderProduct';

@Component({
  selector: 'li.caas-order-item',
  templateUrl: './order-item.component.html'
})
export class OrderItemComponent {
  @Input() orderProduct: OrderProduct = undefined;
}
