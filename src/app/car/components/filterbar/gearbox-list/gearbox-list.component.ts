import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-gearbox-list',
  templateUrl: './gearbox-list.component.html',
  styleUrls: ['./gearbox-list.component.sass']
})
export class GearboxListComponent implements OnInit, OnDestroy {

  gearboxTypes: Gearbox[];
  selectedGearboxTypes: Gearbox[];
  gearboxSubscription: Subscription;
  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.gearboxTypes = this.carService.getGearboxTypes();
    this.gearboxSubscription = this.carService.GearboxTypesChanged.subscribe(
      (gearboxTypes: Gearbox[]) => {
        this.gearboxTypes = gearboxTypes;
      }
    );
    this.selectedGearboxTypes = this.carFilterService.getSelectedGearboxTypes();
  }

  checkIfSelected(gearboxType: Gearbox) {
    return this.selectedGearboxTypes.includes(gearboxType);
  }

  ngOnDestroy() {
    this.gearboxSubscription.unsubscribe();
  }

}
