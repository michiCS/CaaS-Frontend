import { Component, OnInit } from '@angular/core';
import { format, lastDayOfMonth, startOfMonth } from 'date-fns'
import { DataSample } from 'src/app/domain/dataSample';
import { SoldProduct } from 'src/app/domain/soldProduct';
import { AdminService } from '../admin.service';


@Component({
  selector: 'caas-statistics',
  templateUrl: './statistics.component.html'
})
export class StatisticsComponent implements OnInit {

  start: string;
  end: string;

  data: any;
  doughnutData: any;
  avgRevenue: number;

  revenueData: DataSample[] = [];

  soldProducts: SoldProduct[] = [];
  cols: any[] = [];
  productCount: number = 5;

  pattern = "yyyy-MM-dd";

  constructor(private adminService: AdminService) {
  }

  ngOnInit(): void {
    const today = new Date();
    this.start = format(startOfMonth(today), this.pattern);
    this.end = format(lastDayOfMonth(today), this.pattern);

    this.adminService.getOpenClosedCarts().subscribe(res => {
      this.doughnutData = {
        labels: ["Open", "Closed"],
        datasets: [
          {
            data: [res["nrOpen"], res["nrClosed"]],
            backgroundColor: [
              "#FF6384",
              "#36A2EB",
            ],
          }
        ]
      }
    });

    this.cols = [
      { field: "productName", header: "Product Name" },
      { field: "nrSold", header: "Number Sold" }
    ];

    this.loadTimedData();
  }

  loadTimedData(): void {
    this.adminService.getAvgRevenue(this.start, this.end).subscribe(res => {
      this.avgRevenue = res;
    });

    this.adminService.getRevenueForTimeInteval(this.start, this.end).subscribe(res => {
      this.revenueData = res;
      const labels = [];
      const data = [];

      this.revenueData.forEach(dataSample => {
        labels.push(dataSample.dateString);
        data.push(dataSample.value);
      })

      this.data = {
        labels: labels,
        datasets: [
          {
            label: "Revenue",
            data: data
          }
        ]
      }
    });

    this.loadMostSoldProducts();
  }

  loadMostSoldProducts(): void {
    this.adminService.getMostSoldProductsForYear(this.start, this.end, this.productCount).subscribe(res => {
      this.soldProducts = res;
    })
  }

}
