import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';
import { Subscription } from 'rxjs';
import { Fuel } from '../../models/fuel.model';
import { Gearbox } from '../../models/gearbox.model';
import { Car } from '../../models/car.model';
import { CarFilterService } from '../../services/car-filter.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-select-car',
  templateUrl: './select-car.component.html',
  styleUrls: ['./select-car.component.sass']
})
export class SelectCarComponent implements OnInit, OnDestroy {

  selectedBrands: Brand[] = [];
  selectedFuelTypes: Fuel[] = [];
  selectedGearboxTypes: Gearbox[] = [];
  selectedModels: Car[] = [];

  brandSub: Subscription;
  fuelTypeSub: Subscription;
  gearboxTypeSub: Subscription;
  modelSub: Subscription;

  constructor(
    private dmService: DataManagementService,
    private carService: CarService,
    private carFilterService: CarFilterService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    if (!this.carService.hasData()) {
      this.spinner.show();
      this.dmService.getCarData().subscribe(
        () => {
          this.spinner.hide();
        },
        () => {
          this.spinner.hide();
        }
      );
    }
    this.brandSub = this.carFilterService.selectedBrandsChanged.subscribe(
      (brands: Brand[]) => {
        this.selectedBrands = brands;
      }
    );
    this.fuelTypeSub = this.carFilterService.selectedFuelTypesChanged.subscribe(
      (fuelTypes: Fuel[]) => {
        this.selectedFuelTypes = fuelTypes;
      }
    );

    this.gearboxTypeSub = this.carFilterService.selectedGearboxTypesChanged.subscribe(
      (gearboxTypes: Gearbox[]) => {
        this.selectedGearboxTypes = gearboxTypes;
      }
    );

    this.modelSub = this.carFilterService.selectedModelsChanged.subscribe(
      (cars: Car[]) => {
        this.selectedModels = cars;
      }
    );
  }

  onSearch() {
    console.log(this.selectedBrands);
    console.log(this.selectedFuelTypes);
    console.log(this.selectedGearboxTypes);
    console.log(this.selectedModels);
  }

  ngOnDestroy() {
    this.brandSub.unsubscribe();
    this.fuelTypeSub.unsubscribe();
    this.gearboxTypeSub.unsubscribe();
    this.modelSub.unsubscribe();
  }


}
