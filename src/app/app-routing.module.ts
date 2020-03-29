import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarDetailsComponent } from './car/components/car-details/car-details.component';
import { CarFilterComponent } from './car/components/car-filter/car-filter.component';
import { HomeComponent } from './home-page/components/home/home.component';

const routes: Routes = [
// add a default route
{path: '', component: HomeComponent},
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
