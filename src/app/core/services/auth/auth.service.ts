import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from '../../models/core-models/responseModel';
import { RegisterModel } from '../../models/auth/registerModel';
import { SingleResponseModel } from '../../models/core-models/singleResponseModel';
import { TokenModel } from '../../models/auth/tokenModel';
import { LoginModel } from '../../models/auth/loginModel';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiBaseUrl + "auths/"
  constructor(
    private httpClient: HttpClient,
    private jwtHelper:JwtHelperService
    ) { }

  register(model: RegisterModel): Observable<ResponseModel> {
    return this.httpClient.post<ResponseModel>(this.apiUrl + "RegisterAsync", model)
  }

  login(model: LoginModel): Observable<SingleResponseModel<TokenModel>> {
    return this.httpClient.post<SingleResponseModel<TokenModel>>(this.apiUrl + 'loginAsync', model)
  }

  isAuthenticated() {
    const token = localStorage.getItem("token");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem("token");
  }


}
