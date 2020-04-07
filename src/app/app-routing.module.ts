import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car/components/car-details/car-details.component';
import { CarFilterComponent } from './car/components/car-filter/car-filter.component';
import { HomeComponent } from './home-page/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';

const routes: Routes = [
// add a default route
{path: '', component: HomeComponent, data: { animation: 'home' }},
{path: 'auth', children: [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent}
]},
  { path: 'car',
    children: [
      { path: '', component: CarFilterComponent},
      { path: ':id', component: CarDetailsComponent }
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
