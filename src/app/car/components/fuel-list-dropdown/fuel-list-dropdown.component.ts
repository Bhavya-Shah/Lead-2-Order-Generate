import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Fuel } from '../../models/fuel.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-fuel-list-dropdown',
  templateUrl: './fuel-list-dropdown.component.html',
  styleUrls: ['./fuel-list-dropdown.component.sass']
})
export class FuelListDropdownComponent implements OnInit, OnDestroy {

  @Input() isShow = false;
  @Output() selectedFuelTypesEmitter = new EventEmitter<Fuel[]>();
  fuelTypes: Fuel[] = [];
  selectedFuelTypes: Fuel[] = [];
  fuelSub: Subscription;
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.fuelTypes = this.carService.getFuelTypes();
    this.fuelSub = this.carService.FuelTypesChanged.subscribe(
      (fuelTypes: Fuel[]) => {
        this.fuelTypes = fuelTypes;
      }
    );
  }
  onCheckboxChanged(fuel: Fuel, checkboxElement: HTMLInputElement) {
    if (checkboxElement.checked) {
      this.selectedFuelTypes.push(fuel);
    } else {
      const index = this.selectedFuelTypes.indexOf(fuel);
      this.selectedFuelTypes.splice(index, 1);
    }
    this.selectedFuelTypesEmitter.emit(this.selectedFuelTypes.slice());
  }

  ngOnDestroy() {
    this.fuelSub.unsubscribe();
  }

}
