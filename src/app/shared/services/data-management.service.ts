import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

import { Car } from 'src/app/car/models/car.model';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { Brand } from 'src/app/car/models/brand.model';
import { Fuel } from 'src/app/car/models/fuel.model';
import { Gearbox } from 'src/app/car/models/gearbox.model';


@Injectable({providedIn: 'root'})
export class DataManagementService{
  cars: Car[];
  brands: Brand[];
  fuelTypes: Fuel[];
  gearboxType: Gearbox[];
  priceRanges: PriceRange[] = [
    new PriceRange(40000, 44999),
    new PriceRange(45000, 49999),
    new PriceRange(50000, 59999)
  ];

  constructor(private http: HttpClient){}

  getCarData(){
    this.http.get('http://localhost:52778/api/car').subscribe( resData => {
      console.log(resData);
    });
  }

}
