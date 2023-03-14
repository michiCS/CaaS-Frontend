import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DataSample } from '../domain/dataSample';
import { DiscountAction } from '../domain/discountAction';
import { DiscountRule } from '../domain/discountRule';
import { Product } from '../domain/product';
import { SoldProduct } from '../domain/soldProduct';
import { Tenant } from '../domain/tenant';
import { AdminApiModule } from './admin-api.module';


@Injectable({
  providedIn: AdminApiModule
})
export class AdminService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    return of(error);
  }

  private appKeyHeader = () => new HttpHeaders().set("app-key", environment.appKey)

  getProducts(): Observable<Product[]> {
    return this.http.get(`${environment.server}/products/all`, { headers: this.appKeyHeader() })
      .pipe(map<any, Product>(res => res), catchError(this.errorHandler));
  }

  createProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.server}/products`, product, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  updateProduct(product: Product): Observable<any> {
    return this.http.patch(`${environment.server}/products`, product, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  deleteProduct(productId: number): Observable<any> {
    return this.http.delete(`${environment.server}/products/${productId}`, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  getDiscountRules(): Observable<DiscountRule[]> {
    return this.http.get(`${environment.server}/discountrules/tenant`, { headers: this.appKeyHeader() })
      .pipe(map<any, DiscountRule[]>(res => res), catchError(this.errorHandler));
  }

  createDiscountRule(discountRule: DiscountRule): Observable<any> {
    return this.http.post(`${environment.server}/discountRules`, discountRule, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  updateDiscountRule(discountRule: DiscountRule): Observable<any> {
    return this.http.patch(`${environment.server}/discountRules`, discountRule, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  deleteDiscountRule(discountRuleId: number): Observable<any> {
    return this.http.delete(`${environment.server}/discountRules/${discountRuleId}`, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  getDiscountActions(): Observable<DiscountAction[]> {
    return this.http.get(`${environment.server}/discountactions/tenant`, { headers: this.appKeyHeader() })
      .pipe(map<any, DiscountAction[]>(res => res), catchError(this.errorHandler));
  }

  createDiscountAction(discountAction: DiscountAction): Observable<any> {
    return this.http.post(`${environment.server}/discountactions/`, discountAction, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  updateDiscountAction(discountAction: DiscountAction): Observable<any> {
    return this.http.patch(`${environment.server}/discountactions/`, discountAction, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  deleteDiscountAction(discountActionId: number): Observable<any> {
    return this.http.delete(`${environment.server}/discountactions/${discountActionId}`, { headers: this.appKeyHeader() })
      .pipe(catchError(this.errorHandler));
  }

  getTenant(tenantId: number): Observable<Tenant> {
    return this.http.get(`${environment.server}/tenants/${tenantId}`, { headers: this.appKeyHeader() })
      .pipe(map<any, Tenant>(res => res), catchError(this.errorHandler));
  }

  createTenant(name: string): Observable<Tenant> {
    return this.http.post(`${environment.server}/tenants/`, { name })
      .pipe(map<any, Tenant>(res => res), catchError(this.errorHandler));
  }

  updateTenant(name: string, requestNewAppKey: boolean): Observable<Tenant> {
    return this.http.patch(`${environment.server}/tenants/`, { name, requestNewAppKey }, { headers: this.appKeyHeader() })
      .pipe(map<any, Tenant>(res => res), catchError(this.errorHandler));
  }

  getMostSoldProductsForYear(start: string, end: string, count: number): Observable<SoldProduct[]> {
    let params = new HttpParams();
    params = params
      .set("start", start)
      .set("end", end)
      .set("count", count);

    return this.http.get(`${environment.server}/statistics/most-sold-products`, { params, headers: this.appKeyHeader() })
      .pipe(map<any, any>(res => res), catchError(this.errorHandler));
  }

  getAvgRevenue(start: string, end: string): Observable<number> {
    let params = new HttpParams();
    params = params
      .set("start", start)
      .set("end", end);

    return this.http.get(`${environment.server}/statistics/avg-revenue`, { params, headers: this.appKeyHeader() })
      .pipe(map<any, number>(res => res), catchError(this.errorHandler));
  }

  getRevenueForTimeInteval(start: string, end: string): Observable<DataSample[]> {
    let params = new HttpParams();
    params = params
      .set("start", start)
      .set("end", end);

    return this.http.get(`${environment.server}/statistics/revenue-by-date`, { params, headers: this.appKeyHeader() })
      .pipe(map<any, DataSample[]>(res => res), catchError(this.errorHandler));
  }

  getOpenClosedCarts(): Observable<number> {
    return this.http.get(`${environment.server}/statistics/nr-open-closed-carts`, { headers: this.appKeyHeader() })
      .pipe(map<any, any>(res => res), catchError(this.errorHandler));
  }
}
