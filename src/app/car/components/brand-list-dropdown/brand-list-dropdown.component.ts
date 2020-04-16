import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { CarService } from '../../services/car.service';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';

@Component({
  selector: 'app-brand-list-dropdown',
  templateUrl: './brand-list-dropdown.component.html',
  styleUrls: ['./brand-list-dropdown.component.sass']
})
export class BrandListDropdownComponent implements OnInit, OnDestroy {

  brands: Brand[] = [];
  brandSub: Subscription;
  @Input() isShow = false;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService,
    private dmService: DataManagementService
  ) { }

  ngOnInit(): void {
    this.brands = this.carService.getBrands();
    this.brandSub = this.carService.BrandsChanged.subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      }
    );
  }
  onCheckboxChanged(brand: Brand, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedBrand(brand, !checkboxElement.checked);
  }
  ngOnDestroy() {
    this.brandSub.unsubscribe();
  }

}
