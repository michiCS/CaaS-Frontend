import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AdminService } from '../admin.service';

@Component({
  selector: 'caas-tenant-management',
  templateUrl: './tenant-management.component.html'
})
export class TenantManagementComponent implements OnInit {

  tenantId: number;
  name: string = "";
  appKey: string = "";
  requestNewAppKey: boolean;

  displayTenantCreatedDialog: boolean = false;
  displayAppKeyChangedDialog: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.tenantId = environment.tenantId;
    if (this.tenantId) {
      this.adminService.getTenant(this.tenantId).subscribe(res => {
        this.name = res.name;
      })
    }
  }

  createTenant(): void {
    this.adminService.createTenant(this.name).subscribe(res => {
      this.tenantId = res.id;
      this.name = res.name;
      this.appKey = res.appKey;
      this.displayTenantCreatedDialog = true;
    })
  }

  updateTenant(): void {
    this.adminService.updateTenant(this.name, this.requestNewAppKey).subscribe(res => {
      if (this.requestNewAppKey) {
        this.appKey = res.appKey;
        this.displayAppKeyChangedDialog = true;
      }
    })
  }
}
