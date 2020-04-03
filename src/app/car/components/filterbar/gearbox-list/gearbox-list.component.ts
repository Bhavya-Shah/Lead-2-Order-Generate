import { Component, OnInit, OnDestroy } from '@angular/core';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-gearbox-list',
  templateUrl: './gearbox-list.component.html',
  styleUrls: ['./gearbox-list.component.sass']
})
export class GearboxListComponent implements OnInit, OnDestroy {

  gearboxTypes: Gearbox[];
  gearboxSubscription: Subscription;
  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.gearboxTypes = this.carService.getGearboxTypes();
    this.gearboxSubscription = this.carService.GearboxTypesChanged.subscribe(
      (gearboxTypes: Gearbox[]) => {
        this.gearboxTypes = gearboxTypes;
      });
  }

  ngOnDestroy(){
    this.gearboxSubscription.unsubscribe();
  }

}
