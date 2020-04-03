import { Component, OnInit, Input } from '@angular/core';
import { Car } from 'src/app/car/models/car.model';

@Component({
  selector: 'app-car-item',
  templateUrl: './car-item.component.html',
  styleUrls: ['./car-item.component.sass']
})
export class CarItemComponent implements OnInit {

  @Input('car-item') car: Car;
  constructor() { }

  ngOnInit(): void {
  }

  getImage(){
    return "../../../../assets/images/cars/"+(this.car.CarId % 5)+'.jpg';
  }
}
