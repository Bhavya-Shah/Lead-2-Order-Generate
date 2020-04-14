import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from 'src/app/car/services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.sass']
})
export class BrandItemComponent implements OnInit, OnDestroy {

  toggle: boolean = false;
  resetCheckboxSub: Subscription;
  @Input('brand-item') brand: Brand;
  @ViewChild('brandCheckbox') brandCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carService.resetAllCheckbox.subscribe(() => {
      this.toggle = false;
      this.brandCheckbox.nativeElement.checked = false;
    });
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedBrand.next({
      brand: this.brand,
      checkedToUnchecked: !this.brandCheckbox.nativeElement.checked
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
