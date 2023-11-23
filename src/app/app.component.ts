import { Component } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ecommerceAngular';
  isAuthenticated: boolean = false;

  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.isAuthenticated = true
    }
    else{
      this.isAuthenticated = false
    }
  }

  logout(){
    this.authService.logout()
    this.isAuthenticated = false
  }
}
