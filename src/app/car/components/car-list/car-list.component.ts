import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Car } from 'src/app/car/models/car.model';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';
import { Fuel } from '../../models/fuel.model';
import { Gearbox } from '../../models/gearbox.model';
import { PriceRange } from '../../models/price-range.model';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.sass']
})
export class CarListComponent implements OnInit, OnDestroy {
  cars: Car[] = [];
  filteredCars: Car[] = [];
  selectedBrands: Brand[] = [];
  selectedFuelTypes: Fuel[] = [];
  selectedGearboxTypes: Gearbox[] = [];
  selectedPriceRanges: PriceRange[] = [];
  carSubscription: Subscription;
  brandCheckboxSub: Subscription;
  fuelTypeCheckboxSub: Subscription;
  gearboxTypeCheckboxSub: Subscription;
  priceRangeCheckboxSub: Subscription;
  resetFilterSub: Subscription;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.carSubscription = this.carService.CarsChanged.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
        this.filteredCars = cars;
      }
    );
    this.filteredCars = this.cars;

    this.brandCheckboxSub = this.carService.changedBrand.subscribe(
      (res: { brand: Brand; checkedToUnchecked: boolean }) => {
        res.checkedToUnchecked
          ? this.removeElementFromArray(this.selectedBrands, res.brand)
          : this.selectedBrands.push(res.brand);
        this.carFilter();
      }
    );

    this.fuelTypeCheckboxSub = this.carService.changedFuelType.subscribe(
      (res: { fuelType: Fuel; checkedToUnchecked: boolean }) => {
        res.checkedToUnchecked
          ? this.removeElementFromArray(this.selectedFuelTypes, res.fuelType)
          : this.selectedFuelTypes.push(res.fuelType);
        this.carFilter();
      }
    );

    this.gearboxTypeCheckboxSub = this.carService.changedGearboxType.subscribe(
      (res: { gearboxType: Gearbox; checkedToUnchecked: boolean }) => {
        res.checkedToUnchecked
          ? this.removeElementFromArray(
              this.selectedGearboxTypes,
              res.gearboxType
            )
          : this.selectedGearboxTypes.push(res.gearboxType);
        this.carFilter();
      }
    );

    this.priceRangeCheckboxSub = this.carService.changedPriceRange.subscribe(
      (res: { priceRange: PriceRange; checkedToUnchecked: boolean }) => {
        res.checkedToUnchecked
          ? this.removeElementFromArray(
              this.selectedPriceRanges,
              res.priceRange
            )
          : this.selectedPriceRanges.push(res.priceRange);
        this.carFilter();
      }
    );

    this.resetFilterSub = this.carService.resetAllCheckbox.subscribe(() => {
      this.filteredCars = this.cars;
      this.selectedBrands = [];
      this.selectedFuelTypes = [];
      this.selectedGearboxTypes = [];
      this.selectedPriceRanges = [];
    });
  }

  carFilter() {
    this.filteredCars = this.cars.filter(car => {
      let brandCheck: boolean = false;
      let fuelTypeCheck: boolean = false;
      let gearboxTypeCheck: boolean = false;
      this.selectedBrands.map(selectedBrand => {
        if (selectedBrand.BrandId === car.Brand.BrandId) {
          brandCheck = true;
        }
      });
      this.selectedFuelTypes.map(selectedFuelType => {
        if (selectedFuelType.FuelId === car.Fuel.FuelId) {
          fuelTypeCheck = true;
        }
      });
      this.selectedGearboxTypes.map(selectedGearboxType => {
        if (selectedGearboxType.GearboxId === car.Gearbox.GearboxId) {
          gearboxTypeCheck = true;
        }
      });
      const fuelFilter =
        this.selectedFuelTypes.length > 0 ? fuelTypeCheck : true;
      const brandFilter = this.selectedBrands.length > 0 ? brandCheck : true;
      const gearboxFilter =
        this.selectedGearboxTypes.length > 0 ? gearboxTypeCheck : true;
      var priceRangeFilter = false;
      if (this.selectedPriceRanges.length > 0) {
        for (const priceRange of this.selectedPriceRanges) {
          if (car.LeasePrice >= priceRange.min && car.LeasePrice <= priceRange.max) {
            priceRangeFilter = true;
          }
        }
      } else {
        priceRangeFilter = true;
      }
      return fuelFilter && brandFilter && gearboxFilter && priceRangeFilter;
    });
  }

  removeElementFromArray(array: any[], ele: any) {
    const index = array.indexOf(ele);
    array.splice(index, 1);
  }

  ngOnDestroy() {
    this.carSubscription.unsubscribe();
    this.brandCheckboxSub.unsubscribe();
    this.fuelTypeCheckboxSub.unsubscribe();
    this.gearboxTypeCheckboxSub.unsubscribe();
    this.priceRangeCheckboxSub.unsubscribe();
    this.resetFilterSub.unsubscribe();
  }
}
