import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Car } from '../models/car.model';
import { CarService } from './car.service';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CarResolverService implements Resolve<Observable<any> | Car[]> {
  constructor(
    private carService: CarService,
    private dmService: DataManagementService
  ) {}

  resolve(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const cars = this.carService.getCars();
    if (cars.length === 0) {
      return this.dmService.getCarData();
    } else {
      return cars;
    }
  }
}
