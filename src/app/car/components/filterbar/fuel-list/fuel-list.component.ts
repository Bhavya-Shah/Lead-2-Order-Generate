import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.sass']
})
export class FuelListComponent implements OnInit, OnDestroy {

  fuelTypes: Fuel[];
  fuelSubscription: Subscription;

  constructor(private carService: CarService) {
  }

  ngOnInit(): void {
    this.fuelTypes = this.carService.getFuelTypes();
    this.fuelSubscription = this.carService.FuelTypesChanged.subscribe(
      (fuelTypes: Fuel[]) => {
        this.fuelTypes = fuelTypes;
      });
  }

  ngOnDestroy(){
    this.fuelSubscription.unsubscribe();
  }
}
