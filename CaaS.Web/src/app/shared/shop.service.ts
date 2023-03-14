import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cart } from '../domain/cart';
import { CartProductForCreation } from '../domain/cartProductForCreation';
import { Customer } from '../domain/customer';
import { Order } from '../domain/order';
import { Product } from '../domain/product';
import { UpdateQuantityModel } from '../domain/updateQuantityModel';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  constructor(private http: HttpClient) { }

  private errorHandler(error: Error | any): Observable<any> {
    return of(error);
  }

  getProductsPagination(tenantId: number, limit: number, offset: number): Observable<Product[]> {
    return this.http.get(`${environment.server}/products/tenant/${tenantId}/pagination?limit=${limit}&offset=${offset}`)
      .pipe(map<any, Product>(res => res), catchError(this.errorHandler));
  }

  getProductsCount(tenantId: number): Observable<number> {
    return this.http.get(`${environment.server}/products/tenant/${tenantId}/available/count`)
      .pipe(catchError(this.errorHandler));
  }

  searchProducts(tenantId: number, searchTerm: string): Observable<Product[]> {
    let params = new HttpParams();
    params = params.set("term", searchTerm);

    return this.http.get(`${environment.server}/products/tenant/${tenantId}/search`, { params })
      .pipe(map<any, Product>(res => res), catchError(this.errorHandler));
  }

  getCart(cartId: number): Observable<Cart> {
    return this.http.get(`${environment.server}/carts/${cartId}/calculated/`)
      .pipe(map<any, Cart>(res => res), catchError(this.errorHandler));
  }

  addProductToCart(cartProduct: CartProductForCreation): Observable<any> {
    return this.http.post(`${environment.server}/cartproducts`, cartProduct)
      .pipe(catchError(this.errorHandler));
  }

  deleteCartProduct(cartProductId: number): Observable<any> {
    return this.http.delete(`${environment.server}/cartproducts/${cartProductId}`)
      .pipe(catchError(this.errorHandler));
  }

  updateQuantity(updateQuantityModel: UpdateQuantityModel): Observable<any> {
    return this.http.patch(`${environment.server}/cartproducts`, updateQuantityModel)
      .pipe(catchError(this.errorHandler));
  }

  createCart(tenantId: number): Observable<Cart> {
    return this.http.post(`${environment.server}/carts`, { tenantId })
      .pipe(map<any, Cart>(res => res), catchError(this.errorHandler));
  }

  clearCart(cartId: number): Observable<any> {
    return this.http.delete(`${environment.server}/cartproducts/cart/${cartId}`)
      .pipe(catchError(this.errorHandler));
  }

  getOrder(orderId: number): Observable<Order> {
    return this.http.get(`${environment.server}/orders/${orderId}`)
      .pipe(map<any, Order>(res => res), catchError(this.errorHandler));
  }

  createOrder(cartId: number, customerId: number): Observable<any> {
    return this.http.post(`${environment.server}/orders`, { cartId, customerId })
      .pipe(catchError(this.errorHandler));
  }

  getCustomer(email: string, tenantId: number): Observable<Customer> {
    return this.http.get(`${environment.server}/customers/tenant/${tenantId}/email/${email}`)
      .pipe(map<any, Customer>(res => res), catchError(this.errorHandler));
  }

  createCustomer(customer: Customer): Observable<Customer> {
    return this.http.post(`${environment.server}/customers`, customer)
      .pipe(map<any, Customer[]>(res => res), catchError(this.errorHandler));
  }
}
