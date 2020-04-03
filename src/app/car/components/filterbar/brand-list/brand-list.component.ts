import { Component, OnInit, OnDestroy } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from '../../../services/car.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.sass']
})
export class BrandListComponent implements OnInit, OnDestroy {

  brands: Brand[];
  brandSubscription: Subscription;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.brands = this.carService.getBrands();
    this.brandSubscription = this.carService.BrandsChanged.subscribe(
      (brands: Brand[]) => {
        this.brands = brands;
      });
  }

  ngOnDestroy(): void {
    this.brandSubscription.unsubscribe();
  }

}
