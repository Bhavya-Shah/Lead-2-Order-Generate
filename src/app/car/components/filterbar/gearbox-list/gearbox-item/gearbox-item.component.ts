import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-gearbox-item',
  templateUrl: './gearbox-item.component.html',
  styleUrls: ['./gearbox-item.component.sass']
})
export class GearboxItemComponent implements OnInit {

  toggle: boolean = false;
  @Input('gearbox-item') gearbox: Gearbox;
  @ViewChild('gearboxCheckbox') gearboxCheckbox: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedGearboxType.next({
      gearboxType: this.gearbox,
      checkedToUnchecked: !this.gearboxCheckbox.nativeElement.checked
    });
  }
}
