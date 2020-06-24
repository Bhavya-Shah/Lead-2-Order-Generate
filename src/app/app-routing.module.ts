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
import { SelectCarComponent } from './car/components/select-car/select-car.component';
import { PersonalDetailsComponent } from './user-details/components/personal-details/personal-details.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { EmploymentDetailsComponent } from './user-details/components/employment-details/employment-details.component';

const routes: Routes = [
  // add a default route
  { path: '', component: HomeComponent, data: { animation: 'home' } },
  {
    path: 'auth', children: [
      { path: '', redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  },
  {
    path: 'car', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: SelectCarComponent},
      { path: 'search', component: CarFilterComponent, resolve: [CarResolverService]},
      { path: 'detail/:id', component: CarDetailsComponent, resolve: [CarResolverService] }
    ]
  },
  {
    path: 'user', component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'personal-details', component: PersonalDetailsComponent },
      { path: 'employment-details', component: EmploymentDetailsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
