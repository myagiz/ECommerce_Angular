import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
// canActivate: [LoginGuard]
const routes: Routes = [
  { path: '', data: { title: 'E-Ticaret' }, component: ProductsComponent},
  { path: 'register', data: { title: 'Kayıt Ol' }, component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
