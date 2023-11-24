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
// canActivate: [LoginGuard]
const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'management', component: GeneralComponent },
  { path: 'user-management', component: UserComponent },
  { path: 'product-management', component: ProductComponent },
  { path: 'order-management', component: OrderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
