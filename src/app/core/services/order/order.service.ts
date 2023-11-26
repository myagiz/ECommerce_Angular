import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../../models/core-models/responseModel';
import { Observable } from 'rxjs';
import { CreateOrderModel } from '../../models/order/createOrderModel';
import { ListResponseModel } from '../../models/core-models/listResponseModel';
import { GetAllOrderModel } from '../../models/order/getAllOrderModel';
import { SingleResponseModel } from '../../models/core-models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  apiUrl = environment.apiBaseUrl + "orders/"
  constructor(private httpClient: HttpClient) { }


  createOrder(model: CreateOrderModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'CreateOrderAsync', model)
  }

  changeOrderStatus(orderId: number, statusId: number): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'ChangeOrderStatus?orderId=' + orderId + "&statusId=" + statusId, null)
  }

  getAllOwnedOrder(): Observable<ListResponseModel<GetAllOrderModel>> {
    let newPath = this.apiUrl + 'GetAllOwnedOrderAsync';
    return this.httpClient.get<ListResponseModel<GetAllOrderModel>>(newPath);
  }

  getAllOrder(): Observable<ListResponseModel<GetAllOrderModel>> {
    let newPath = this.apiUrl + 'GetAllOrderAsync';
    return this.httpClient.get<ListResponseModel<GetAllOrderModel>>(newPath);
  }

  getOrderDetail(id: number): Observable<SingleResponseModel<GetAllOrderModel>> {
    let newPath = this.apiUrl + 'GetOrderDetailAsync/' + id;
    return this.httpClient.get<SingleResponseModel<GetAllOrderModel>>(newPath);
  }
}
