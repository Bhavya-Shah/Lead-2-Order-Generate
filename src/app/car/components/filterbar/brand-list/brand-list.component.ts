import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.sass']
})
export class BrandListComponent implements OnInit {

  brands: Brand[];

  constructor(private carService: CarService) { }

  ngOnInit(): void {
    this.brands = this.carService.getBrands();
  }

}
