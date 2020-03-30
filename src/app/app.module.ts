import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FilterbarComponent } from './car/components/filterbar/filterbar.component';
import { CarListComponent } from './car/components/car-list/car-list.component';
import { CarDetailsComponent } from './car/components/car-details/car-details.component';
import { BrandListComponent } from './car/components/filterbar/brand-list/brand-list.component';
import { GearboxListComponent } from './car/components/filterbar/gearbox-list/gearbox-list.component';
import { FuelListComponent } from './car/components/filterbar/fuel-list/fuel-list.component';
import { BrandItemComponent } from './car/components/filterbar/brand-list/brand-item/brand-item.component';
import { GearboxItemComponent } from './car/components/filterbar/gearbox-list/gearbox-item/gearbox-item.component';
import { FuelItemComponent } from './car/components/filterbar/fuel-list/fuel-item/fuel-item.component';
import { CarItemComponent } from './car/components/car-list/car-item/car-item.component';
import { CarFilterComponent } from './car/components/car-filter/car-filter.component';
import { DropdownDirective } from './shared/directives/dropdown.directive';
import { HomeComponent } from './home-page/components/home/home.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { RegisterComponent } from './auth/components/register/register.component';
// import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    FilterbarComponent,
    CarListComponent,
    CarDetailsComponent,
    BrandListComponent,
    GearboxListComponent,
    FuelListComponent,
    BrandItemComponent,
    GearboxItemComponent,
    FuelItemComponent,
    CarItemComponent,
    CarFilterComponent,
    DropdownDirective,
    HomeComponent,
    LoginComponent,
    ForgotPasswordComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    // FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
