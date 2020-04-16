import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';

import { Car } from '../models/car.model';
import { Gearbox } from '../models/gearbox.model';
import { Brand } from '../models/brand.model';
import { Fuel } from '../models/fuel.model';
import { PriceRange } from '../models/price-range.model';
import { Mileage } from '../models/mileage.model';
import { PaybackTime } from '../models/paybackTime.model';

@Injectable({ providedIn: 'root' })
export class CarService {

  BrandsChanged = new Subject<Brand[]>();
  GearboxTypesChanged = new Subject<Gearbox[]>();
  FuelTypesChanged = new Subject<Fuel[]>();
  PriceRangesChanged = new Subject<PriceRange[]>();
  MileagesChanged = new Subject<Mileage[]>();
  PaybackTimesChanged = new Subject<PaybackTime[]>();
  CarsChanged = new Subject<Car[]>();

  mileages: Mileage[] = [];
  paybackTimes: PaybackTime[] = [];
  gearboxTypes: Gearbox[] = [];
  brands: Brand[] = [];
  fuelTypes: Fuel[] = [];
  priceRanges: PriceRange[] = [];
  cars: Car[] = [];

  // gearboxTypes: Gearbox[] = [
  //   new Gearbox(1, 'Automatic'),
  //   new Gearbox(2, 'Semi-Automatic'),
  //   new Gearbox(3, 'Manual')
  // ];

  // brands: Brand[] = [
  //   new Brand(1, 'Tesla'),
  //   new Brand(2, 'Ford'),
  //   new Brand(3, 'Audi'),
  //   new Brand(4, 'BMW')
  // ];

  // fuelTypes: Fuel[] = [
  //   new Fuel(1, 'Petrol'),
  //   new Fuel(2, 'Diesel'),
  //   new Fuel(3, 'Electric')
  // ];

  // priceRanges: PriceRange[] = [
  //   new PriceRange(40000, 44999),
  //   new PriceRange(45000, 49999),
  //   new PriceRange(50000, 59999)
  // ];

  // cars: Car[] = [
  //   new Car(
  //     1,
  //     'Model 3',
  //     'Tesla Model 3',
  //     this.brands[0],
  //     this.fuelTypes[2],
  //     this.gearboxTypes[1],
  //     50690
  //   ),
  //   new Car(
  //     2,
  //     'Model X',
  //     'Tesla Model X',
  //     this.brands[0],
  //     this.fuelTypes[2],
  //     this.gearboxTypes[0],
  //     59470
  //   ),
  //   new Car(
  //     3,
  //     'R8',
  //     '2020 R8 Coupe',
  //     this.brands[2],
  //     this.fuelTypes[0],
  //     this.gearboxTypes[2],
  //     46930
  //   ),
  //   new Car(
  //     4,
  //     'Model 5',
  //     'BMW 5 Series Sedan',
  //     this.brands[3],
  //     this.fuelTypes[1],
  //     this.gearboxTypes[1],
  //     49830
  //   ),
  //   new Car(
  //     5,
  //     'Mustang',
  //     'Ford Mustang',
  //     this.brands[1],
  //     this.fuelTypes[1],
  //     this.gearboxTypes[1],
  //     57460
  //   )
  // ];

  setData(
    cars: Car[],
    brands: Brand[],
    fuelTypes: Fuel[],
    gearboxTypes: Gearbox[],
    priceRanges: PriceRange[],
    mileages: Mileage[],
    paybackTimes: PaybackTime[]
  ) {
    this.brands = brands;
    this.BrandsChanged.next(this.brands.slice());
    this.fuelTypes = fuelTypes;
    this.FuelTypesChanged.next(this.fuelTypes.slice());
    this.gearboxTypes = gearboxTypes;
    this.GearboxTypesChanged.next(this.gearboxTypes.slice());
    this.priceRanges = priceRanges;
    this.PriceRangesChanged.next(this.priceRanges.slice());
    this.cars = cars;
    this.CarsChanged.next(this.cars.slice());
    this.mileages = mileages;
    this.MileagesChanged.next(this.mileages.slice());
    this.paybackTimes = paybackTimes;
    this.PaybackTimesChanged.next(this.paybackTimes.slice());
  }

  getBrands() {
    return this.brands.slice();
  }

  getFuelTypes() {
    return this.fuelTypes.slice();
  }

  getGearboxTypes() {
    return this.gearboxTypes.slice();
  }

  getPriceRanges() {
    return this.priceRanges.slice();
  }

  getMileages() {
    return this.mileages.slice();
  }

  getPaybackTimes() {
    return this.paybackTimes.slice();
  }

  getCars() {
    return this.cars.slice();
  }

  getCarById(id: number): Car {
    let car: Car;
    this.cars.forEach((carItem) => {
      if (carItem.CarId === id) {
        car = carItem;
        return car;
      }
    });
    return car;
  }

  calculateLease(car: Car, mileage: number = 10000, month: number = 24) {
    const x1 = car.Price / 10;
    const x2 = x1 * ((mileage / 1000) * 2) / 100;
    const x3 = x1 * (month / 2) / 100;
    const price = x1 + x2 - x3;
    return Number(price.toFixed(2));
  }

  hasData(): boolean {
    if (
      this.cars.length === 0 ||
      this.brands.length === 0 ||
      this.gearboxTypes.length === 0 ||
      this.fuelTypes.length === 0 ||
      this.priceRanges.length === 0 ||
      this.mileages.length === 0 ||
      this.paybackTimes.length === 0
    ) {
      return false;
    }
    return true;
  }
}
