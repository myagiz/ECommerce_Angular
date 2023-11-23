import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(
    private jwtHelper:JwtHelperService
    ) { }
    
    getRoles(): any {
      const token = localStorage.getItem("token");
      if (token) {
  
        let roles: string[] = this.jwtHelper.decodeToken(token)['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
  
        return roles;
      }
    }
  
   
    getCurrentEmailAddress(){
      const token=localStorage.getItem("token");
      if(token){
        var emailAddress=  this.jwtHelper.decodeToken(token)['email'];
        return emailAddress;
      }
    }

    getCurrentFullName(){
      const token=localStorage.getItem("token");
      if(token){
        var fullName=  this.jwtHelper.decodeToken(token)['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
        return fullName;
      }
    }


    getCurrentUserId(){
      const token=localStorage.getItem("token");
      if(token){
        var userId=  this.jwtHelper.decodeToken(token)['userId'];
        return userId;
      }
    }

    


  }
