import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Gearbox } from '../../models/gearbox.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';
import { PriceRange } from '../../models/price-range.model';

@Component({
  selector: 'app-price-list-dropdown',
  templateUrl: './price-list-dropdown.component.html',
  styleUrls: ['./price-list-dropdown.component.sass']
})
export class PriceListDropdownComponent implements OnInit {
  @Input() isShow = false;
  priceRanges: PriceRange[] = [];
  priceRangeSub: Subscription;
  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.priceRanges = this.carService.getPriceRanges();
    this.priceRangeSub = this.carService.PriceRangesChanged.subscribe(
      (priceRange: PriceRange[]) => {
        this.priceRanges = priceRange;
      }
    );
  }

  onCheckboxChanged(priceRange: PriceRange, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedPriceRanges(priceRange, !checkboxElement.checked);
    console.log(priceRange)
  }

  ngOnDestroy() {
    this.priceRangeSub.unsubscribe();
  }
}
