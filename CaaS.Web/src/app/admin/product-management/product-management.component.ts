import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { AdminService } from '../admin.service';

@Component({
  selector: 'caas-product-management',
  templateUrl: './product-management.component.html',
  providers: [MessageService]
})
export class ProductManagementComponent implements OnInit {

  products: Product[] = [];
  selectedProduct: Product = {};

  constructor(private adminService: AdminService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe(res => {
      this.products = res;
    });
  }

  reset(): void {
    this.selectedProduct = {};
    this.loadProducts();
  }

  createProduct(): void {
    this.adminService.createProduct(this.selectedProduct).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Product created!" });
      }
      this.reset();
    })
  }

  updateProduct(): void {
    this.adminService.updateProduct(this.selectedProduct).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Product updated!" });
      }
      this.reset();
    })
  }

  restoreProduct(): void {
    this.selectedProduct.isDeleted = false;
    this.updateProduct();
  }

  deleteProduct(): void {
    this.adminService.deleteProduct(this.selectedProduct.id).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Product deleted!" });
      }
      this.reset();
    })
  }
}
