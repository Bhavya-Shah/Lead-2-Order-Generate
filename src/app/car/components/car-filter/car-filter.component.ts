import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.sass'],
})
export class CarFilterComponent implements OnInit {
  constructor(
    private dmService: DataManagementService,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    if (!this.carService.hasData()) {
      this.dmService.getCarData().subscribe();
    }
  }
}
