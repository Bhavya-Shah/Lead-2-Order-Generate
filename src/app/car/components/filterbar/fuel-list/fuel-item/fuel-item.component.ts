import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-fuel-item',
  templateUrl: './fuel-item.component.html',
  styleUrls: ['./fuel-item.component.sass']
})
export class FuelItemComponent implements OnInit {

  toggle: boolean = false;
  @Input('fuel-item') fuelType: Fuel;
  @ViewChild('fuelCheckbox') fuelCheckbox: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedFuelType.emit({
      fuelType: this.fuelType,
      checkedToUnchecked: !this.fuelCheckbox.nativeElement.checked
    });
  }
}
