import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-price-range-item',
  templateUrl: 'price-range-item.component.html'
})
export class PriceRangeItemComponent{
  @Input() priceRange: PriceRange;
  @ViewChild('priceRangeCheckbox') priceRangeCheckbox: ElementRef;
  toggle: boolean = false;

  constructor(private carService: CarService){}

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedPriceRange.emit({
      priceRange: this.priceRange,
      checkedToUnchecked: !this.priceRangeCheckbox.nativeElement.checked
    });
  }
}
