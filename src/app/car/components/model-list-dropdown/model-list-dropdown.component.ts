import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Car } from '../../models/car.model';
import { Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { CarFilterService } from '../../services/car-filter.service';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-model-list-dropdown',
  templateUrl: './model-list-dropdown.component.html',
  styleUrls: ['./model-list-dropdown.component.sass']
})
export class ModelListDropdownComponent implements OnInit, OnDestroy {

  @Input() isShow = false;
  cars: Car[] = [];
  filteredCars: Car[] = [];
  isDisabled = true;
  carSub: Subscription;
  brandSub: Subscription;
  fuelSub: Subscription;
  gearboxSub: Subscription;
  priceRangeSub: Subscription;
  dropdownSub: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.carSub = this.carService.CarsChanged.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
      }
    );
    this.brandSub = this.carFilterService.selectedBrandsChanged.subscribe(
      () => {
        this.isDisabled = false;
        this.filteredCars = this.carFilterService.filterCars();
      }
    );
    this.fuelSub = this.carFilterService.selectedFuelTypesChanged.subscribe(
      () => {
        this.isDisabled = false;
        this.filteredCars = this.carFilterService.filterCars();
      }
    );
    this.gearboxSub = this.carFilterService.selectedGearboxTypesChanged.subscribe(
      () => {
        this.isDisabled = false;
        this.filteredCars = this.carFilterService.filterCars();
      }
    );
    this.priceRangeSub = this.carFilterService.selectedPriceRangesChanged.subscribe(
      () => {
        this.isDisabled = false;
        this.filteredCars = this.carFilterService.filterCars();
      }
    );
    this.dropdownSub = this.dropdownService.closeModelDropdownObs.subscribe(() => {
      this.isShow = false;
    });
  }

  onSelectModel() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.dropdownService.openModelDropdownOnly();
    }
  }

  onCheckboxChanged(car: Car, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedModels(car, !checkboxElement.checked);
  }

  ngOnDestroy() {
    this.brandSub.unsubscribe();
    this.gearboxSub.unsubscribe();
    this.fuelSub.unsubscribe();
    this.priceRangeSub.unsubscribe();
    this.dropdownSub.unsubscribe();
  }
}
