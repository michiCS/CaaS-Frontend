import { CartProduct } from "./cartProduct";

export interface Cart {
    id?: number;
    listPrice?: number;
    total?: number;
    productDiscount?: number;
    cartDiscount?: number;
    sumDiscounts?: number;
    cartProducts?: CartProduct[];
}