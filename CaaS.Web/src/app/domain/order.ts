import { OrderProduct } from "./orderProduct";

export interface Order {
    id?: number;
    date?: string;
    customerName?: string;
    customerEmail?: string;
    total?: number;
    listPrice?: number;
    productDiscount?: number;
    cartDiscount?: number;
    sumDiscounts?: number;
    orderProducts?: OrderProduct[];
}