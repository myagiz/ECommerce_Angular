export interface GetAllOrderModel {
    id: number
    orderDate: Date
    orderStatus: number
    orderStatusName: string
    createUserName: string
    totalPrice: number
    productList: OrderDetails[]
}

export interface OrderDetails {
    id: number
    orderId: number
    productName: string
    productUnitPrice: number
    amount: number
    productPrice: number
    productTotalPrice: number

}