import { Component, Input, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { PriceRange } from 'src/app/car/models/price-range.model';
import { CarService } from 'src/app/car/services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-price-range-item',
  templateUrl: 'price-range-item.component.html',
  styleUrls: ['price-range-item.component.sass']
})
export class PriceRangeItemComponent implements OnInit, OnDestroy{

  @Input() priceRange: PriceRange;
  @ViewChild('priceRangeCheckbox') priceRangeCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  toggle: boolean = false;
  resetCheckboxSub: Subscription;

  constructor(private carService: CarService){}

  ngOnInit(){
    this.resetCheckboxSub = this.carService.resetAllCheckbox.subscribe(() => {
      this.toggle = false;
      this.priceRangeCheckbox.nativeElement.checked = false;
    });
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedPriceRange.next({
      priceRange: this.priceRange,
      checkedToUnchecked: !this.priceRangeCheckbox.nativeElement.checked
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
