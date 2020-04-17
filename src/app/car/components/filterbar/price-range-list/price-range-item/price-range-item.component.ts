import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-price-range-item',
  templateUrl: 'price-range-item.component.html',
  styleUrls: ['price-range-item.component.sass']
})
export class PriceRangeItemComponent implements OnInit, OnDestroy {

  @Input() priceRange: PriceRange;
  @ViewChild('priceRangeCheckbox') priceRangeCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  toggle = false;
  resetCheckboxSub: Subscription;

  constructor(
    private carFilterService: CarFilterService
  ) { }

  ngOnInit() {
    this.resetCheckboxSub = this.carFilterService.resetFilterSubject.subscribe(() => {
      this.toggle = false;
      this.priceRangeCheckbox.nativeElement.checked = false;
    });
  }

  onChange() {
    this.toggle = !this.toggle;
    this.carFilterService.changeInSelectedPriceRanges(this.priceRange, !this.priceRangeCheckbox.nativeElement.checked);

    // if (this.toggle === true) {
    //   this.label.nativeElement.style.cssText = 'background-color: hotpink';
    // } else {
    //   this.label.nativeElement.style.removeProperty = 'background-color';
    // }
  }

  ngOnDestroy() {
    this.resetCheckboxSub.unsubscribe();
  }
}
