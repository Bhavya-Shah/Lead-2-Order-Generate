import { Injectable } from '@angular/core';
import { Brand } from '../models/brand.model';
import { Fuel } from '../models/fuel.model';
import { Gearbox } from '../models/gearbox.model';
import { PriceRange } from '../models/price-range.model';
import { Subject } from 'rxjs';
import { Car } from '../models/car.model';
import { CarService } from './car.service';

@Injectable({ providedIn: 'root'})
export class CarFilterService {

  selectedBrands: Brand[] = [];
  selectedFuelTypes: Fuel[] = [];
  selectedGearboxTypes: Gearbox[] = [];
  selectedPriceRanges: PriceRange[] = [];
  selectedModels: Car[] = [];

  selectedBrandsChanged = new Subject<Brand[]>();
  selectedFuelTypesChanged = new Subject<Fuel[]>();
  selectedGearboxTypesChanged = new Subject<Gearbox[]>();
  selectedPriceRangesChanged = new Subject<PriceRange[]>();
  selectedModelsChanged = new Subject<Car[]>();
  resetFilterSubject = new Subject();

  filteredCars: Car[] = [];

  constructor(
    private carService: CarService
  ) {}

  changeInSelectedBrand(brand: Brand, checkedToUnchecked: boolean) {
    if (checkedToUnchecked) {
      const index = this.selectedBrands.indexOf(brand);
      this.selectedBrands.splice(index, 1);
    } else {
      this.selectedBrands.push(brand);
    }
    this.selectedBrandsChanged.next(this.selectedBrands.slice());
  }

  changeInSelectedFuelType(fuelType: Fuel, checkedToUnchecked: boolean) {
    if (checkedToUnchecked) {
      const index = this.selectedFuelTypes.indexOf(fuelType);
      this.selectedFuelTypes.splice(index, 1);
    } else {
      this.selectedFuelTypes.push(fuelType);
    }
    this.selectedFuelTypesChanged.next(this.selectedFuelTypes.slice());
  }

  changeInSelectedGearboxType(gearbox: Gearbox, checkedToUnchecked: boolean) {
    if (checkedToUnchecked) {
      const index = this.selectedGearboxTypes.indexOf(gearbox);
      this.selectedGearboxTypes.splice(index, 1);
    } else {
      this.selectedGearboxTypes.push(gearbox);
    }
    this.selectedGearboxTypesChanged.next(this.selectedGearboxTypes.slice());
  }

  changeInSelectedPriceRanges(priceRange: PriceRange, checkedToUnchecked: boolean) {
    if (checkedToUnchecked) {
      const index = this.selectedPriceRanges.indexOf(priceRange);
      this.selectedPriceRanges.splice(index, 1);
    } else {
      this.selectedPriceRanges.push(priceRange);
    }
    this.selectedPriceRangesChanged.next(this.selectedPriceRanges.slice());
  }

  changeInSelectedModels(car: Car, checkedToUnchecked: boolean) {
    if (checkedToUnchecked) {
      const index = this.selectedModels.indexOf(car);
      this.selectedModels.splice(index, 1);
    } else {
      this.selectedModels.push(car);
    }
    this.selectedModelsChanged.next(this.selectedModels.slice());
  }

  resetFilters() {
    this.selectedBrands = [];
    this.selectedFuelTypes = [];
    this.selectedGearboxTypes = [];
    this.selectedPriceRanges = [];
    this.selectedModels = [];
    this.resetFilterSubject.next();
  }

  filterCars(): Car[] {
    const cars = this.carService.getCars();
    this.filteredCars = cars.filter(car => {
      let brandCheck = false;
      let fuelTypeCheck = false;
      let gearboxTypeCheck = false;
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
      let priceRangeFilter = false;
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
    return this.filteredCars.slice();
  }

}
