import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { CarService } from 'src/app/car/services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fuel-item',
  templateUrl: './fuel-item.component.html',
  styleUrls: ['./fuel-item.component.sass']
})
export class FuelItemComponent implements OnInit, OnDestroy {

  toggle: boolean = false;
  resetCheckboxSub: Subscription;
  @Input('fuel-item') fuelType: Fuel;
  @ViewChild('fuelCheckbox') fuelCheckbox: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carService.resetAllCheckbox.subscribe(() => {
      this.toggle = false;
      this.fuelCheckbox.nativeElement.checked = false;
    });
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedFuelType.next({
      fuelType: this.fuelType,
      checkedToUnchecked: !this.fuelCheckbox.nativeElement.checked
    });
  }

  ngOnDestroy(){
    this.resetCheckboxSub.unsubscribe();
  }
}
