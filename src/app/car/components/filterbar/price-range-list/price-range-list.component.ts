import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/car/services/car.service';
import { PriceRange } from 'src/app/car/models/price-range.model';

@Component({
  selector: 'app-price-range-list',
  templateUrl: 'price-range-list.component.html'
})
export class PriceRangeListComponent implements OnInit{
  priceRanges: PriceRange[] = [];

  constructor(private carService: CarService){}

  ngOnInit(){
    this.priceRanges = this.carService.getPriceRanges();
  }
}
