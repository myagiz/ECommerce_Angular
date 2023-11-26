import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/auth/login/login.component';
import { GeneralComponent } from './components/management/general/general.component';
import { ProductComponent } from './components/management/product/product.component';
import { UserComponent } from './components/management/user/user.component';
import { OrderComponent } from './components/management/order/order.component';
import { AdminGuard } from './core/guards/admin.guard';
import { StandartGuard } from './core/guards/standart.guard';
import { MainDashboardComponent } from './components/main-dashboard/main-dashboard.component';
import { OrdersComponent } from './components/orders/orders.component';

// canActivate: [LoginGuard]
const routes: Routes = [
  { path: '', component: MainDashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'orders', component: OrdersComponent, canActivate: [StandartGuard] },
  { path: 'management', component: GeneralComponent, canActivate: [AdminGuard] },
  { path: 'user-management', component: UserComponent, canActivate: [AdminGuard] },
  { path: 'product-management', component: ProductComponent, canActivate: [AdminGuard] },
  { path: 'order-management', component: OrderComponent, canActivate: [AdminGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
