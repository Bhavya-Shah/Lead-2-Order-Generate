import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Gearbox } from 'src/app/car/models/gearbox.model';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-gearbox-item',
  templateUrl: './gearbox-item.component.html',
  styleUrls: ['./gearbox-item.component.sass']
})
export class GearboxItemComponent implements OnInit, OnDestroy {

  toggle = false;
  resetCheckboxSub: Subscription;
  @Input('gearbox-item') gearbox: Gearbox;
  @ViewChild('gearboxCheckbox') gearboxCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  constructor(
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carFilterService.resetFilterSubject.subscribe(() => {
      this.toggle = false;
      this.gearboxCheckbox.nativeElement.checked = false;
    });
  }

  onChange() {
    this.toggle = !this.toggle;
    this.carFilterService.changeInSelectedGearboxType(this.gearbox, !this.gearboxCheckbox.nativeElement.checked);
  }

  ngOnDestroy() {
    this.resetCheckboxSub.unsubscribe();
  }
}
