import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'caas-shop-header',
  templateUrl: './shop-header.component.html'
})
export class ShopHeaderComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToCart(): void {
    this.router.navigate(["shop/cart"]);
  }

  navigateToAdmin(): void {
    this.router.navigate(["shop/admin"]);
  }
}
