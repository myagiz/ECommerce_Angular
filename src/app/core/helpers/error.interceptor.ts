// import { Injectable } from '@angular/core';
// import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError } from 'rxjs/operators';
// import { AuthenticationService } from '../services/auth.service';
// import { LoginService } from '../services/login/login.service';

// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {

//     constructor(private authenticationService: AuthenticationService, private loginService:LoginService) { }

//     intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//         return next.handle(request).pipe(catchError(err => {
//             if (err.status === 401) {
//                 // auto logout if 401 response returned from api
//                 this.loginService.logout();
//                 // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });

//                 location.reload();
//             }
//             const error = err.error.message || err.statusText;
//             return throwError(error);
//         }))
//     }
// }
