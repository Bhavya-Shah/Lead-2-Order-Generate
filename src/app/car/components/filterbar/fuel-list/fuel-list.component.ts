import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.sass']
})
export class FuelListComponent implements OnInit, OnDestroy {

  fuelTypes: Fuel[];
  selectedFuelTypes: Fuel[];
  fuelSubscription: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) {
  }

  ngOnInit(): void {
    this.fuelTypes = this.carService.getFuelTypes();
    this.fuelSubscription = this.carService.FuelTypesChanged.subscribe(
      (fuelTypes: Fuel[]) => {
        this.fuelTypes = fuelTypes;
      }
    );
    this.selectedFuelTypes = this.carFilterService.getSelectedFuelTypes();
  }

  checkIfSelected(fuelType: Fuel) {
    return this.selectedFuelTypes.includes(fuelType);
  }

  ngOnDestroy(){
    this.fuelSubscription.unsubscribe();
  }
}
