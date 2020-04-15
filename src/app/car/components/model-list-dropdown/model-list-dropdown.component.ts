import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Car } from '../../models/car.model';
import { Subscription } from 'rxjs';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';

@Component({
  selector: 'app-model-list-dropdown',
  templateUrl: './model-list-dropdown.component.html',
  styleUrls: ['./model-list-dropdown.component.sass']
})
export class ModelListDropdownComponent implements OnInit, OnDestroy {

  @Input() isShow = false;
  @Output() selectedModelsEmitter = new EventEmitter<Car[]>();
  cars: Car[] = [];
  carSub: Subscription;
  filteredCars: Car[] = [];
  selectedModels: Car[] = [];
  isDisabled = true;
  selectedBrands: Brand[] = [];
  brandSub: Subscription;
  private selectedBrandIds: number[] = [];
  constructor(
    private carService: CarService
  ) { }

  ngOnInit(): void {
    this.cars = this.carService.getCars();
    this.filterCars();
    this.carSub = this.carService.CarsChanged.subscribe(
      (cars: Car[]) => {
        this.cars = cars;
        this.filterCars();
      }
    );
    this.brandSub = this.carService.changedBrand.subscribe(
      (obj: { brand: Brand; checkedToUnchecked: boolean }) => {
        // console.log('subscribe');
        this.isDisabled = false;
        if (obj.checkedToUnchecked) {
          const index = this.selectedBrands.indexOf(obj.brand);
          this.selectedBrands.splice(index, 1);
        } else {
          this.selectedBrands.push(obj.brand);
        }
        this.filterCars();
        // console.log(this.selectedBrands);
      }
    );
  }

  filterCars() {
    if (this.selectedBrands.length > 0) {
      this.filteredCars = [];
      this.cars.map(car => {
        if (this.selectedBrandIds.includes(car.Brand.BrandId)) {
          this.filteredCars.push(car);
        } else {
          this.selectedBrands.map(brand => {
            if (car.Brand.BrandId === brand.BrandId) {
              this.filteredCars.push(car);
              this.selectedBrandIds.push(brand.BrandId);
            }
          });
        }
      });
    } else {
      this.isDisabled = true;
      this.isShow = false;
      // this.filteredCars = this.cars;
    }
  }

  onCheckboxChanged(car: Car, checkboxElement: HTMLInputElement) {
    // console.log('next');
    if (checkboxElement.checked) {
      this.selectedModels.push(car);
    } else {
      const index = this.selectedModels.indexOf(car);
      this.selectedModels.splice(index, 1);
    }
    this.selectedModelsEmitter.emit(this.selectedModels.slice());
  }

  ngOnDestroy() {
    this.brandSub.unsubscribe();
  }
}
