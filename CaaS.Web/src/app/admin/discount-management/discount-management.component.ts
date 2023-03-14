import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { DiscountAction } from 'src/app/domain/discountAction';
import { DiscountRule } from 'src/app/domain/discountRule';
import { AdminService } from '../admin.service';

@Component({
  selector: 'caas-discount-management',
  templateUrl: './discount-management.component.html',
  providers: [MessageService]
})
export class DiscountManagementComponent implements OnInit {

  constructor(private adminService: AdminService, private messageService: MessageService) { }

  discountRules: DiscountRule[] = [];
  discountActions: DiscountAction[] = [];

  selectedRule: DiscountRule = {};
  products: any[] = [];

  selectedAction: DiscountAction = {};

  ruleTypes: any[] = [
    { type: 0, name: "Cart" },
    { type: 1, name: "CartProduct" }
  ];

  actionTypes: any[] = [
    { type: 0, name: "$" },
    { type: 1, name: "%" }
  ];

  minDate: Date;
  maxDate: Date;

  ngOnInit(): void {
    this.loadRules();
    this.loadProducts();
    this.loadActions();
  }

  resetRules(): void {
    this.selectedRule = {};
    this.loadRules();
    this.maxDate = undefined;
    this.minDate = undefined;
  }

  resetActions(): void {
    this.selectedAction = {};
    this.loadActions();
  }

  loadRules(): void {
    this.adminService.getDiscountRules().subscribe(res => {
      this.discountRules = res;
    });
  }

  loadActions(): void {
    this.adminService.getDiscountActions().subscribe(res => {
      this.discountActions = res;
    });
  }

  loadProducts(): void {
    this.adminService.getProducts().subscribe(res => {
      const productsResult = res;
      productsResult.forEach(p => {
        this.products.push({
          id: p.id,
          name: p.name
        });
      })
    });
  }

  createRule(): void {
    this.adminService.createDiscountRule(this.selectedRule).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Rule created!" });
      }
      this.resetRules();
    })
  }

  updateRule(): void {
    this.adminService.updateDiscountRule(this.selectedRule).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Rule updated!" });
      }
      this.resetRules();
    })
  }

  deleteRule(): void {
    this.adminService.deleteDiscountRule(this.selectedRule.id).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Rule deleted!" });
      }
      this.resetRules();
    })
  }

  createAction(): void {
    this.adminService.createDiscountAction(this.selectedAction).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Action created!" });
      }
      this.resetActions();
    })
  }

  updateAction(): void {
    this.adminService.updateDiscountAction(this.selectedAction).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Action updated!" });
      }
      this.resetActions();
    })
  }

  deleteAction(): void {
    this.adminService.deleteDiscountAction(this.selectedAction.id).subscribe(res => {
      if (!(res instanceof HttpErrorResponse)) {
        this.messageService.add({ severity: "success", summary: "Action deleted!" });
      }
      else if (res.status === 409) {
        this.messageService.add({
          severity: "error", summary: "Cannot delete Action",
          detail: `Action with id ${this.selectedAction.id} cannot get deleted, because associated Rules exist!`
        });
      }
      this.resetActions();
    })
  }

  setMinMaxDates(): void {
    if (this.selectedRule && this.selectedRule.dateFrom && this.selectedRule.dateTo) {
      this.minDate = new Date(this.selectedRule.dateFrom);
      this.maxDate = new Date(this.selectedRule.dateTo);
    }
  }
}
