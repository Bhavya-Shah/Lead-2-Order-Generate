import { Component, OnInit, Input, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from 'src/app/car/services/car.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.sass']
})
export class BrandItemComponent implements OnInit, OnDestroy {

  @Input() isSelected = false;
  resetCheckboxSub: Subscription;
  @Input('brand-item') brand: Brand;
  @ViewChild('brandCheckbox') brandCheckbox: ElementRef;
  @ViewChild('label') label: ElementRef;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.resetCheckboxSub = this.carFilterService.resetFilterSubject.subscribe(() => {
      this.isSelected = false;
      this.brandCheckbox.nativeElement.checked = false;
    });
  }

  onChange() {
    this.isSelected = !this.isSelected;
    this.carFilterService.changeInSelectedBrand(this.brand, !this.brandCheckbox.nativeElement.checked);
  }

  ngOnDestroy() {
    this.resetCheckboxSub.unsubscribe();
  }
}
