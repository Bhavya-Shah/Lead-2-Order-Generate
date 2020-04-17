import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { CarService } from '../../services/car.service';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from '../../services/car-filter.service';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'app-brand-list-dropdown',
  templateUrl: './brand-list-dropdown.component.html',
  styleUrls: ['./brand-list-dropdown.component.sass']
})
export class BrandListDropdownComponent implements OnInit, OnDestroy {

  brands: Brand[] = [];
  brandSub: Subscription;
  dropdownSub: Subscription;
  @Input() isShow = false;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService,
    private dropdownService: DropdownService,
    private dmService: DataManagementService
  ) { }

  ngOnInit(): void {
    this.brands = this.carService.getBrands();
    this.brandSub = this.carService.BrandsChanged.subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      }
    );
    this.dropdownSub = this.dropdownService.closeBrandDropdownObs.subscribe(() => {
      this.isShow = false;
    });
  }

  onSelectBrand() {
    this.isShow = !this.isShow;
    if (this.isShow) {
      this.dropdownService.openBrandDropdownOnly();
    }
  }

  onCheckboxChanged(brand: Brand, checkboxElement: HTMLInputElement) {
    this.carFilterService.changeInSelectedBrand(brand, !checkboxElement.checked);
  }
  ngOnDestroy() {
    this.brandSub.unsubscribe();
    this.dropdownSub.unsubscribe();
  }

}
