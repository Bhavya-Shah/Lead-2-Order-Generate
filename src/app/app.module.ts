import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgxSpinnerModule } from 'ngx-spinner';
import { Ng5SliderModule } from 'ng5-slider';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
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
import { PriceRangeListComponent } from './car/components/filterbar/price-range-list/price-range-list.component';
import { PriceRangeItemComponent } from './car/components/filterbar/price-range-list/price-range-item/price-range-item.component';
import { AuthInterceptorService } from './auth/interceptor/auth-interceptor.service';
import { HeaderComponent } from './shared/components/header/header.component';
import { StepsProgressBarComponent } from './shared/components/steps-progress-bar/steps-progress-bar.component';
import { SelectCarComponent } from './car/components/select-car/select-car.component';
import { CustomAccordionComponent } from './shared/components/custom-accordion/custom-accordion.component';
import { BrandListDropdownComponent } from './car/components/brand-list-dropdown/brand-list-dropdown.component';
import { ModelListDropdownComponent } from './car/components/model-list-dropdown/model-list-dropdown.component';
import { GearboxListDropdownComponent } from './car/components/gearbox-list-dropdown/gearbox-list-dropdown.component';
import { FuelListDropdownComponent } from './car/components/fuel-list-dropdown/fuel-list-dropdown.component';
import { PriceListDropdownComponent } from './car/components/price-list-dropdown/price-list-dropdown.component';
import { PersonalDetailsComponent } from './user-details/components/personal-details/personal-details.component';
import { LayoutComponent } from './shared/components/layout/layout.component';
import { EmploymentDetailsComponent } from './user-details/components/employment-details/employment-details.component';

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
    RegisterComponent,
    PriceRangeListComponent,
    PriceRangeItemComponent,
    HeaderComponent,
    StepsProgressBarComponent,
    SelectCarComponent,
    CustomAccordionComponent,
    BrandListDropdownComponent,
    ModelListDropdownComponent,
    GearboxListDropdownComponent,
    FuelListDropdownComponent,
    PriceListDropdownComponent,
    PersonalDetailsComponent,
    LayoutComponent,
    EmploymentDetailsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule,
    NgxSpinnerModule,
    Ng5SliderModule
  ],
  providers: [
    DatePipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
