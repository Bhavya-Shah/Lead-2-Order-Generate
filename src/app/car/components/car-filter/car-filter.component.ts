import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';

@Component({
  selector: 'app-car-filter',
  templateUrl: './car-filter.component.html',
  styleUrls: ['./car-filter.component.sass']
})
export class CarFilterComponent implements OnInit {

  constructor(private dmService: DataManagementService) { }

  ngOnInit(): void {
    this.dmService.getCarData();
  }

}
