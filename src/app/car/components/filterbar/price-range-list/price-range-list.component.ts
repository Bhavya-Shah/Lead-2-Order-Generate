import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/car/services/car.service';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-price-range-list',
  templateUrl: 'price-range-list.component.html'
})
export class PriceRangeListComponent implements OnInit, OnDestroy {
  priceRanges: PriceRange[] = [];
  selectedPriceRanges: PriceRange[];
  priceRangeSubscription: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) { }

  ngOnInit() {
    this.priceRanges = this.carService.getPriceRanges();
    this.priceRangeSubscription = this.carService.PriceRangesChanged.subscribe(
      (priceRanges: PriceRange[]) => {
        this.priceRanges = priceRanges;
      }
    );
    this.selectedPriceRanges = this.carFilterService.getSelectedPriceRange();
  }

  checkIfSelected(priceRange: PriceRange) {
    return this.selectedPriceRanges.includes(priceRange);
  }

  ngOnDestroy(): void {
    this.priceRangeSubscription.unsubscribe();
  }
}
