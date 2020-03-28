import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CarDetailsComponent } from './car/components/car-details/car-details.component';
import { DemoComponent } from './demo/demo.component';
import { CarFilterComponent } from './car/components/car-filter/car-filter.component';


const routes: Routes = [
  { path: '', component: DemoComponent},
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
