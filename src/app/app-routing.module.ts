import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car/components/car-details/car-details.component';
import { CarFilterComponent } from './car/components/car-filter/car-filter.component';
import { HomeComponent } from './home-page/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { CarResolverService } from './car/services/car-resolver.service';
import { LayoutComponent } from './car/components/layout/layout.component';
import { SelectCarComponent } from './car/components/select-car/select-car.component';

const routes: Routes = [
  // add a default route
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  {
    path: 'auth', children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'car', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: SelectCarComponent },
      { path: 'filter', component: CarFilterComponent, resolve: [CarResolverService]},
      { path: ':id', component: CarDetailsComponent, resolve: [CarResolverService] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
