import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Brand } from '../../models/brand.model';
import { CarService } from '../../services/car.service';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-list-dropdown',
  templateUrl: './brand-list-dropdown.component.html',
  styleUrls: ['./brand-list-dropdown.component.sass']
})
export class BrandListDropdownComponent implements OnInit, OnDestroy {

  brands: Brand[] = [];
  selectedBrands: Brand[] = [];
  brandSub: Subscription;
  @Input() isShow = false;
  @Output() selectedBrandsEmitter = new EventEmitter<Brand[]>();

  constructor(
    private carService: CarService,
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
    // console.log('next');
    if (checkboxElement.checked) {
      this.selectedBrands.push(brand);
    } else {
      const index = this.selectedBrands.indexOf(brand);
      this.selectedBrands.splice(index, 1);
    }
    this.selectedBrandsEmitter.emit(this.selectedBrands.slice());
    this.carService.changedBrand.next({
      brand,
      checkedToUnchecked: !checkboxElement.checked
    });
  }
  ngOnDestroy() {
    this.brandSub.unsubscribe();
  }

}
