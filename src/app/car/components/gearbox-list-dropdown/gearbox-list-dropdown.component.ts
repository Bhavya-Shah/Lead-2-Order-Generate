import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Gearbox } from '../../models/gearbox.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';

@Component({
  selector: 'app-gearbox-list-dropdown',
  templateUrl: './gearbox-list-dropdown.component.html',
  styleUrls: ['./gearbox-list-dropdown.component.sass']
})
export class GearboxListDropdownComponent implements OnInit, OnDestroy {
  @Input() isShow = false;
  gearboxTypes: Gearbox[] = [];
  gearboxSub: Subscription;
  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
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
    this.carFilterService.changeInSelectedGearboxType(gearbox, !checkboxElement.checked);
  }

  ngOnDestroy() {
    this.gearboxSub.unsubscribe();
  }
}
