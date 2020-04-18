import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { CarService } from '../../services/car.service';
import { Gearbox } from '../../models/gearbox.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';
import { PriceRange } from '../../models/price-range.model';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-price-list-dropdown',
  templateUrl: './price-list-dropdown.component.html',
  styleUrls: ['./price-list-dropdown.component.sass']
})
export class PriceListDropdownComponent implements OnInit, OnDestroy {
  @Input() isShow = false;
  priceRanges: PriceRange[] = [];
  priceRangeSub: Subscription;
  dropdownSub: Subscription;
  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService,
    private dropdownService: DropdownService
  ) { }

  ngOnInit(): void {
    this.priceRanges = this.carService.getPriceRanges();
    this.priceRangeSub = this.carService.PriceRangesChanged.subscribe(
      (priceRange: PriceRange[]) => {
        this.priceRanges = priceRange;
      }
    );

    this.dropdownSub = this.dropdownService.closePriceRangeDropdownObs.subscribe(() => {
      this.isShow = false;
    });
  }

  onSelectPriceRange() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.dropdownService.openPriceRangeDropdownOnly();
    }
  }

  onCheckboxChanged(priceRange: PriceRange, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedPriceRanges(priceRange, !checkboxElement.checked);
  }

  ngOnDestroy() {
    this.priceRangeSub.unsubscribe();
    this.dropdownSub.unsubscribe();
  }
}
