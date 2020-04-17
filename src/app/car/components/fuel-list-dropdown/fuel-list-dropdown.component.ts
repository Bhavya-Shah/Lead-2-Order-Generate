import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Fuel } from '../../models/fuel.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-fuel-list-dropdown',
  templateUrl: './fuel-list-dropdown.component.html',
  styleUrls: ['./fuel-list-dropdown.component.sass']
})
export class FuelListDropdownComponent implements OnInit, OnDestroy {

  @Input() isShow = false;
  fuelTypes: Fuel[] = [];
  fuelSub: Subscription;
  dropdownSub: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {
    this.fuelTypes = this.carService.getFuelTypes();
    this.fuelSub = this.carService.FuelTypesChanged.subscribe(
      (fuelTypes: Fuel[]) => {
        this.fuelTypes = fuelTypes;
      }
    );
    this.dropdownSub = this.dropdownService.closeFuelDropdownObs.subscribe(() => {
      this.isShow = false;
    });
  }

  onSelectFuel() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.dropdownService.openFuelDropdownOnly();
    }
  }

  onCheckboxChanged(fuel: Fuel, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedFuelType(fuel, !checkboxElement.checked);
  }

  ngOnDestroy() {
    this.fuelSub.unsubscribe();
    this.dropdownSub.unsubscribe();
  }

}
