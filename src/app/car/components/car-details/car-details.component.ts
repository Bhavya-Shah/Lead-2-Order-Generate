import { Component, OnInit } from '@angular/core';
import { Car } from '../../models/car.model';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-car-details',
  templateUrl: './car-details.component.html',
  styleUrls: ['./car-details.component.sass']
})
export class CarDetailsComponent implements OnInit {

  car: Car;
  carId: number;
  constructor(private carService: CarService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params : Params) => {
        this.carId = +params['id'];
        this.car = this.carService.getCarById(this.carId);
      }
    );
  }

}
