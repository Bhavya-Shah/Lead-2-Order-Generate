import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Gearbox } from '../../models/gearbox.model';
import { Subscription } from 'rxjs';
import { Fuel } from '../../models/fuel.model';

@Component({
  selector: 'app-gearbox-list-dropdown',
  templateUrl: './gearbox-list-dropdown.component.html',
  styleUrls: ['./gearbox-list-dropdown.component.sass']
})
export class GearboxListDropdownComponent implements OnInit, OnDestroy {
  @Input() isShow = false;
  @Output() selectedGearboxTypesEmitter = new EventEmitter<Gearbox[]>();
  gearboxTypes: Gearbox[] = [];
  selectedGearboxTypes: Gearbox[] = [];
  gearboxSub: Subscription;
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.gearboxTypes = this.carService.getGearboxTypes();
    this.gearboxSub = this.carService.GearboxTypesChanged.subscribe(
      (gearboxTypes: Gearbox[]) => {
        this.gearboxTypes = gearboxTypes;
      }
    );
  }

  onCheckboxChanged(gearbox: Gearbox, checkboxElement: HTMLInputElement) {
    if (checkboxElement.checked) {
      this.selectedGearboxTypes.push(gearbox);
    } else {
      const index = this.selectedGearboxTypes.indexOf(gearbox);
      this.selectedGearboxTypes.splice(index, 1);
    }
    this.selectedGearboxTypesEmitter.emit(this.selectedGearboxTypes.slice());
  }

  ngOnDestroy() {
    this.gearboxSub.unsubscribe();
  }
}
