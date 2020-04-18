import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { CarService } from '../../services/car.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-select-car',
  templateUrl: './select-car.component.html',
  styleUrls: ['./select-car.component.sass']
})
export class SelectCarComponent implements OnInit {

  constructor(
    private dmService: DataManagementService,
    private carService: CarService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (!this.carService.hasData()) {
      this.spinner.show();
      this.dmService.getCarData().subscribe(
        () => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
  }


}
