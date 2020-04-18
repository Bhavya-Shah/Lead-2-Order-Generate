import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

import { PriceRange } from 'src/app/car/models/price-range.model';
import { GetResponse } from '../models/interfaces/getResponse.model';
import { CarService } from 'src/app/car/services/car.service';

@Injectable({ providedIn: 'root' })
export class DataManagementService {
  getCarApi = 'http://localhost:52778/api/car'
  priceRanges: PriceRange[] = [
    new PriceRange(400, 499),
    new PriceRange(500, 599),
    new PriceRange(600, 699)
  ];

  constructor(private http: HttpClient,
              private carService: CarService) {}

  getCarData() {
    return this.http.get<GetResponse>(this.getCarApi)
      .pipe(
        tap((resData: GetResponse) => {
          console.log(resData);
          this.carService.setData(
            resData.Cars,
            resData.Brands,
            resData.FuelTypes,
            resData.GearBoxTypes,
            this.priceRanges,
            resData.Mileages,
            resData.PaybackTimes
          );
          // this.carService.setBrands(resData.Brands);
          // this.carService.setFuelTypes(resData.FuelTypes);
          // this.carService.setGearboxTypes(resData.GearBoxTypes);
          // this.carService.setCars(resData.Cars);
        })
      );
  }

}
