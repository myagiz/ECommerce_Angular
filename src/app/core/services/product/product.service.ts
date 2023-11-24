import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/core-models/listResponseModel';
import { GetAllProductModel } from '../../models/product/getAllProductModel';
import { ResponseModel } from '../../models/core-models/responseModel';
import { CreateProductModel } from '../../models/product/createProductModel';
import { SingleResponseModel } from '../../models/core-models/singleResponseModel';
import { UpdateProductModel } from '../../models/product/updateProductModel';



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  apiUrl = environment.apiBaseUrl + "products/"
  constructor(private httpClient: HttpClient) { }


  getAllCustomers(): Observable<ListResponseModel<GetAllProductModel>> {
    let newPath = this.apiUrl + "GetAllProductAsync";
    return this.httpClient.get<ListResponseModel<GetAllProductModel>>(newPath);
  }

  getProductById(id: number): Observable<SingleResponseModel<GetAllProductModel>> {
    let newPath = this.apiUrl + "GetProductById/" + id;
    return this.httpClient.get<SingleResponseModel<GetAllProductModel>>(newPath);
  }

  createProduct(model: CreateProductModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'createProductAsync', model)
  }

  updateProduct(model: UpdateProductModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'updateProductAsync', model)
  }


  deleteProduct(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'DeleteProductAsync/' + id)
  }

}
