import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { SessionService } from './core/services/session/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerceAngular';
  isAuthenticated: boolean = false;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true
      const claimRoles = this.sessionService.getRoles()
      if (claimRoles == 'Admin') {
        this.isAdmin = true;
      }
    }
    else {
      this.isAuthenticated = false
    }
  }

  logout() {
    this.authService.logout()
    this.isAuthenticated = false
    window.location.reload();

  }
}
