import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';
import { CarFilterService } from 'src/app/car/services/car-filter.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.sass']
})
export class BrandListComponent implements OnInit, OnDestroy {

  brands: Brand[];
  selectedBrands: Brand[];
  brandSubscription: Subscription;

  constructor(
    private carService: CarService,
    private carFilterService: CarFilterService
  ) { }

  ngOnInit(): void {
    this.brands = this.carService.getBrands();
    this.brandSubscription = this.carService.BrandsChanged.subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      });
    this.selectedBrands = this.carFilterService.getSelectedBrands();
  }

  checkIfSelected(brand: Brand) {
    return this.selectedBrands.includes(brand);
  }

  ngOnDestroy(): void {
    this.brandSubscription.unsubscribe();
  }

}
