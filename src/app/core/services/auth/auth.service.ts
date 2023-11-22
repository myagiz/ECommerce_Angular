import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/core-models/responseModel';
import { RegisterModel } from '../../models/auth/registerModel';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiBaseUrl + "auths/"
  constructor(private httpClient: HttpClient) { }

  register(model: RegisterModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "RegisterAsync", model)
  }


}
