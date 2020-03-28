import { Component, OnInit } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.sass']
})
export class FuelListComponent implements OnInit {

  fuelTypes: Fuel[];

  constructor(private carService: CarService) {
    this.fuelTypes = this.carService.getFuelTypes();
  }

  ngOnInit(): void {
  }

}
