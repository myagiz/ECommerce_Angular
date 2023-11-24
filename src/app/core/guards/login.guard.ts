// import { Injectable } from '@angular/core';
// import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
// import { ToastrService } from 'ngx-toastr';
// import { Observable } from 'rxjs';
// import { LoginService } from '../services/login/login.service';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginGuard implements CanActivate {

//   constructor(private loginService:LoginService,
//      private toastrService:ToastrService,
//       private router:Router,
//       ){

//   }

//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
//       if(this.loginService.isAuthenticated()){
//         return true;
//       }else{
//         this.router.navigate(['auth/login'], { queryParams: { returnUrl: state.url } });
//         // this.toastrService.info("Sisteme giriş yapmalısınız.","Bulutlakolay")
//         return false;
//       }


//   }
  
// }
