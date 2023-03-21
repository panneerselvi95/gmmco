import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NoPageFoundComponent } from './no-page-found/no-page-found.component';
import { LoginVerificationComponent } from './login-verification/login-verification.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './customer/home/home.component'
import { ShippingAddressComponent } from './customer/shipping-address/shipping-address.component';
const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  { path: 'customer', loadChildren: () => import('./customer/customer.module').then(m => m.CustomerModule) },
  {path:'login-verify',component:LoginVerificationComponent},
  {path:'reset',component:ResetPasswordComponent},
  {path:'register',component:RegistrationComponent},
  { path: 'home', component: HomeComponent },
  {path:'shipping-address',component:ShippingAddressComponent},
  {path:'**',component:NoPageFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
