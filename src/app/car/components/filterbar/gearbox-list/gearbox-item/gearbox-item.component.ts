import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import {Subscription} from 'rxjs';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-gearbox-item',
  templateUrl: './gearbox-item.component.html',
  styleUrls: ['./gearbox-item.component.sass']
})
export class GearboxItemComponent implements OnInit, OnDestroy {

  toggle: boolean = false;
  resetCheckboxSub: Subscription;
  @Input('gearbox-item') gearbox: Gearbox;
  @ViewChild('gearboxCheckbox') gearboxCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carService.resetAllCheckbox.subscribe(() => {
      this.toggle = false;
      this.gearboxCheckbox.nativeElement.checked = false;
    });
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedGearboxType.next({
      gearboxType: this.gearbox,
      checkedToUnchecked: !this.gearboxCheckbox.nativeElement.checked
    });
    if(this.toggle == true)
    {
      this.label.nativeElement.style.cssText = 'background-color: hotpink'
    }
    else
    {
      this.label.nativeElement.style.removeProperty = 'background-color'
    }
  }

  ngOnDestroy(){
    this.resetCheckboxSub.unsubscribe();
  }
}
