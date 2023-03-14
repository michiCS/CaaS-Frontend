import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../domain/order';
import { ShopService } from '../../shared/shop.service';

@Component({
  selector: 'caas-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  order: Order = {};

  constructor(private route: ActivatedRoute, private shopService: ShopService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    const orderId = params["id"];
    this.shopService.getOrder(orderId).subscribe(res => {
      this.order = res;
    })
  }
}
