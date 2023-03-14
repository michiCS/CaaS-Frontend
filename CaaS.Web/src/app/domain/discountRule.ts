export interface DiscountRule {
    id?: number,
    applicationType?: number,
    minCartTotal?: number,
    productId?: number,
    minQuantity?: number,
    dateFrom?: string,
    dateTo?: string,
    description?: string,
    actionId?: number
};

