import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ListResponseModel } from '../../models/core-models/listResponseModel';
import { SingleResponseModel } from '../../models/core-models/singleResponseModel';
import { ResponseModel } from '../../models/core-models/responseModel';
import { GetAllUserModel } from '../../models/user/getAllUserModel';
import { CreateUserModel } from '../../models/user/createUserModel';
import { UpdateUserModel } from '../../models/user/updateUserModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl = environment.apiBaseUrl + "users/"
  constructor(private httpClient: HttpClient) { }


  getAllUser(): Observable<ListResponseModel<GetAllUserModel>> {
    let newPath = this.apiUrl + "GetAllUserAsync";
    return this.httpClient.get<ListResponseModel<GetAllUserModel>>(newPath);
  }

  getUserById(id: number): Observable<SingleResponseModel<GetAllUserModel>> {
    let newPath = this.apiUrl + "GetUserByIdAsync/" + id;
    return this.httpClient.get<SingleResponseModel<GetAllUserModel>>(newPath);
  }

  createUser(model: CreateUserModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'CreateUserAsync', model)
  }

  updateUser(model: UpdateUserModel): Observable<ResponseModel> {
    return this.httpClient.put<ResponseModel>(this.apiUrl + 'UpdateUserAsync', model)
  }

  deleteUser(id: number): Observable<ResponseModel> {
    return this.httpClient.delete<ResponseModel>(this.apiUrl + 'DeleteUserAsync/' + id)
  }
}
