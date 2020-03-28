import { Injectable, EventEmitter } from '@angular/core';
import { Car } from '../models/car.model';
import { Gearbox } from '../models/gearbox.model';
import { Brand } from '../models/brand.model';
import { Fuel } from '../models/fuel.model';

@Injectable({providedIn: 'root'})
export class CarService{

  changedBrand = new EventEmitter<{brand: Brand, checkedToUnchecked: boolean}>();
  changedFuelType = new EventEmitter<{fuelType: Fuel, checkedToUnchecked: boolean}>();
  changedGearboxType = new EventEmitter<{gearboxType: Gearbox, checkedToUnchecked: boolean}>();

  gearboxTypes: Gearbox[] = [
    new Gearbox(1, 'Automatic'),
    new Gearbox(2, 'Semi-Automatic'),
    new Gearbox(3, 'Manual')
  ];
  brands: Brand[] = [
    new Brand(1, 'Tesla'),
    new Brand(2, 'Ford'),
    new Brand(3, 'Audi'),
    new Brand(4, 'BMW')
  ];
  fuelTypes: Fuel[] = [
    new Fuel(1, 'Petrol'),
    new Fuel(2, 'Diesel'),
    new Fuel(3, 'Electric')
  ];
  cars: Car[] = [
    new Car(
      1,
      'Model 3',
      'Tesla Model 3',
      this.brands[0],
      this.fuelTypes[2],
      this.gearboxTypes[1],
      50690
    ),
    new Car(
      2,
      'Model X',
      'Tesla Model X',
      this.brands[0],
      this.fuelTypes[2],
      this.gearboxTypes[0],
      59470
    ),
    new Car(
      3,
      'R8',
      '2020 R8 Coupe',
      this.brands[2],
      this.fuelTypes[0],
      this.gearboxTypes[2],
      46930
    ),
    new Car(
      4,
      'Model 5',
      'BMW 5 Series Sedan',
      this.brands[3],
      this.fuelTypes[1],
      this.gearboxTypes[1],
      49830
    ),
    new Car(
      5,
      'Mustang',
      'Ford Mustang',
      this.brands[1],
      this.fuelTypes[1],
      this.gearboxTypes[1],
      57460
    )
  ];

  getBrands(){
    return this.brands.slice();
  }

  getFuelTypes(){
    return this.fuelTypes.slice();
  }

  getGearboxTypes(){
    return this.gearboxTypes.slice();
  }

  getCars(){
    return this.cars.slice();
  }

  getCarById(id): Car {
    let car: Car;
    this.cars.forEach(carItem => {
      if(carItem.id === id) {
        car =  carItem;
        return car;
      }
    });
    return car;
  }
}
