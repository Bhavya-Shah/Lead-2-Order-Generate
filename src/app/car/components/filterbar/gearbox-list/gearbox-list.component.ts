import { Component, OnInit } from '@angular/core';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-gearbox-list',
  templateUrl: './gearbox-list.component.html',
  styleUrls: ['./gearbox-list.component.sass']
})
export class GearboxListComponent implements OnInit {

  gearboxTypes: Gearbox[];
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.gearboxTypes = this.carService.getGearboxTypes();
  }

}
