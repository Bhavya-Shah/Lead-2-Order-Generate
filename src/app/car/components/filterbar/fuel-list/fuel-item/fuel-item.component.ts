import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Fuel } from 'src/app/car/models/fuel.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-fuel-item',
  templateUrl: './fuel-item.component.html',
  styleUrls: ['./fuel-item.component.sass']
})
export class FuelItemComponent implements OnInit, OnDestroy {

  @Input() isSelected = false;
  resetCheckboxSub: Subscription;
  @Input('fuel-item') fuelType: Fuel;
  @ViewChild('fuelCheckbox') fuelCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;


  constructor(
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carFilterService.resetFilterSubject.subscribe(() => {
      this.isSelected = false;
      this.fuelCheckbox.nativeElement.checked = false;
    });
  }

  onChange() {
    this.isSelected = !this.isSelected;
    this.carFilterService.changeInSelectedFuelType(this.fuelType, !this.fuelCheckbox.nativeElement.checked);
  }
  ngOnDestroy() {
    this.resetCheckboxSub.unsubscribe();
  }
}
