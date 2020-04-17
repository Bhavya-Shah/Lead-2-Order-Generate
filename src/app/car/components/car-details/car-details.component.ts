import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Options } from 'ng5-slider';
import { Mileage } from '../../models/mileage.model';
import { PaybackTime } from '../../models/paybackTime.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.sass']
})
export class CarDetailsComponent implements OnInit, OnDestroy {

  car: Car;
  mileages: Mileage[] = [];
  paybackTimes: PaybackTime[] = [];
  mileageSub: Subscription;
  paybackTimeSub: Subscription;
  carId: number;
  mileageValue: number;
  paybackTimeValue: number;
  mileageOptions: Options;
  paybackTimeOptions: Options;

  constructor(
    private carService: CarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.carId = +params.id;
        this.car = this.carService.getCarById(this.carId);
        this.car.LeasePrice = this.carService.calculateLease(this.car);
        console.log(this.car);
      }
    );
    this.mileages = this.carService.getMileages();
    this.createMileageOptions();
    this.mileageSub = this.carService.MileagesChanged.subscribe(
      (mileages: Mileage[]) => {
        this.mileages = mileages;
        this.createMileageOptions();
      }
    );
    this.paybackTimes = this.carService.getPaybackTimes();
    this.createPaybackTimeOptions();
    this.paybackTimeSub = this.carService.PaybackTimesChanged.subscribe(
      (paybackTimes: PaybackTime[]) => {
        this.paybackTimes = paybackTimes;
        this.createPaybackTimeOptions();
      }
    );
  }

  calculateImagePath(): string {
    return '../../../../assets/images/cars/' + this.car.CarId % 5 + '.jpg';
  }

  createPaybackTimeOptions() {
    if (this.paybackTimes.length > 0) {
      this.sortPaybackTimes();
      const floor = this.paybackTimes[0].Months;
      const ceil = this.paybackTimes[this.paybackTimes.length - 1].Months;
      const step = this.paybackTimes[1].Months - this.paybackTimes[0].Months;
      this.paybackTimeOptions = {
        floor,
        ceil,
        step,
        showTicks: true
      };
      this.paybackTimeValue = floor;
    }
  }

  createMileageOptions() {
    if (this.mileages.length > 0) {
      this.sortMileages();
      const floor = this.mileages[0].Kilometer;
      const ceil = this.mileages[this.mileages.length - 1].Kilometer;
      const step = this.mileages[1].Kilometer - this.mileages[0].Kilometer;
      this.mileageOptions = {
        floor,
        ceil,
        step,
        showTicks: true
      };
      this.mileageValue = floor;
    }
  }

  sortMileages() {
    this.mileages = this.mileages.sort(
      (x, y) => {
        if (x.Kilometer > y.Kilometer) {
          return 1;
        } else if (x.Kilometer < y.Kilometer) {
          return -1;
        } else {
          return 0;
        }
      }
    );
  }

  sortPaybackTimes() {
    this.paybackTimes = this.paybackTimes.sort(
      (x, y) => {
        if (x.Months > y.Months) {
          return 1;
        } else if (x.Months < y.Months) {
          return -1;
        } else {
          return 0;
        }
      }
    );
  }

  onSliderChange() {
    this.car.LeasePrice = this.carService.calculateLease(this.car, this.mileageValue, this.paybackTimeValue);
  }

  ngOnDestroy() {
    this.mileageSub.unsubscribe();
    this.paybackTimeSub.unsubscribe();
  }
}
