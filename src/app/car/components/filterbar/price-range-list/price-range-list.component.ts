import { Component, OnInit, OnDestroy } from '@angular/core';
import { CarService } from 'src/app/car/services/car.service';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-range-list',
  templateUrl: 'price-range-list.component.html'
})
export class PriceRangeListComponent implements OnInit, OnDestroy{
  priceRanges: PriceRange[] = [];
  priceRangeSubscription: Subscription;

  constructor(private carService: CarService){}

  ngOnInit(){
    this.priceRanges = this.carService.getPriceRanges();
    this.priceRangeSubscription = this.carService.PriceRangesChanged.subscribe((priceRanges: PriceRange[]) => {
      this.priceRanges = priceRanges;
    });
  }

  ngOnDestroy(): void {
    this.priceRangeSubscription.unsubscribe();
  }
}
