export interface CreateOrderModel {
    productList: ProductListForOrder[]
}

export interface ProductListForOrder {
    productId: number;
    amount: number;
}