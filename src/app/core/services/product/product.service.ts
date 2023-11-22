import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../../models/core-models/listResponseModel';
import { GetAllProductModel } from '../../models/product/getAllProductModel';



@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  apiUrl = environment.apiBaseUrl + "products/"
  constructor(private httpClient:HttpClient) { }


  getAllCustomers(): Observable<ListResponseModel<GetAllProductModel>> {
    let newPath = this.apiUrl + "GetAllProductAsync";
    return this.httpClient.get<ListResponseModel<GetAllProductModel>>(newPath);
  }

}
