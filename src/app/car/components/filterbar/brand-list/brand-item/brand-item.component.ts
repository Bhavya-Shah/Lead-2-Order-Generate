import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Brand } from 'src/app/car/models/brand.model';
import { CarService } from 'src/app/car/services/car.service';

@Component({
  selector: 'app-brand-item',
  templateUrl: './brand-item.component.html',
  styleUrls: ['./brand-item.component.sass']
})
export class BrandItemComponent implements OnInit {

  toggle: boolean = false;
  @Input('brand-item') brand: Brand;
  @ViewChild('brandCheckbox') brandCheckbox: ElementRef;

  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }

  onChange(){
    this.toggle = !this.toggle;
    this.carService.changedBrand.next({
      brand: this.brand,
      checkedToUnchecked: !this.brandCheckbox.nativeElement.checked
    });
  }
}
