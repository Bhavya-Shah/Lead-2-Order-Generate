import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Car } from 'src/app/car/models/car.model';
import { CarService } from '../../services/car.service';
import { CarFilterService } from '../../services/car-filter.service';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.sass']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  filteredCars: Car[] = [];

  carSubscription: Subscription;
  brandSub: Subscription;
  fuelTypeSub: Subscription;
  gearboxTypeSub: Subscription;
  priceRangeSub: Subscription;
  resetFilterSub: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.carSubscription = this.carService.CarsChanged.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
        this.filteredCars = cars;
      }
    );
    this.filteredCars = this.cars;

    this.brandSub = this.carFilterService.selectedBrandsChanged.subscribe(
      () => {
        this.filteredCars = this.carFilterService.filterCars();
      }
    );

    this.fuelTypeSub = this.carFilterService.selectedFuelTypesChanged.subscribe(
      () => {
        this.filteredCars = this.carFilterService.filterCars();
      }
    );

    this.gearboxTypeSub = this.carFilterService.selectedGearboxTypesChanged.subscribe(
      () => {
        this.filteredCars = this.carFilterService.filterCars();
      }
    );

    this.priceRangeSub = this.carFilterService.selectedPriceRangesChanged.subscribe(
      () => {
        this.filteredCars = this.carFilterService.filterCars();
      }
    );

    this.resetFilterSub = this.carFilterService.resetFilterSubject.subscribe(() => {
      this.filteredCars = this.cars;
    });
  }

  ngOnDestroy() {
    this.carSubscription.unsubscribe();
    this.brandSub.unsubscribe();
    this.fuelTypeSub.unsubscribe();
    this.gearboxTypeSub.unsubscribe();
    this.priceRangeSub.unsubscribe();
    this.resetFilterSub.unsubscribe();
  }
}
