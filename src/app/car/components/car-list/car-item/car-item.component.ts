import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/car/models/car.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.sass']
})
export class CarItemComponent implements OnInit {

  @Input('car-item') car: Car;
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.car.LeasePrice = this.carService.calculateLease(this.car);
  }

  getImage() {
    return '../../../../assets/images/cars/' + (this.car.CarId % 11) + '.jpg';
  }
}
