import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { SessionService } from '../services/session/session.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService,
    private toastrService: ToastrService,
    private router: Router,
    private sessionService: SessionService
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const claimRoles = this.sessionService.getRoles()
    if (this.authService.isAuthenticated()) {
      if (claimRoles === 'Admin') {
        return true;
      } else {
        this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
        return false;
      }
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      return false;
    }


  }

}
