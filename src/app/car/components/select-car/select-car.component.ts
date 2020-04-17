import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';
import { Subscription } from 'rxjs';
import { Fuel } from '../../models/fuel.model';
import { Gearbox } from '../../models/gearbox.model';
import { Car } from '../../models/car.model';
import { CarFilterService } from '../../services/car-filter.service';
import { PriceRange } from '../../models/price-range.model';

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
  selectedPriceRanges: PriceRange[] = [];

  brandSub: Subscription;
  fuelTypeSub: Subscription;
  gearboxTypeSub: Subscription;
  modelSub: Subscription;
  priceRanges: Subscription;

  constructor(
    private dmService: DataManagementService,
    private carService: CarService,
    private carFilterService: CarFilterService,
  ) {}

  ngOnInit(): void {
    if (!this.carService.hasData()) {
      this.dmService.getCarData().subscribe();
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
    this.priceRanges = this.carFilterService.selectedPriceRangesChanged.subscribe(
      (priceRanges: PriceRange[])=>{
        this.selectedPriceRanges = priceRanges;
      }
    )
  }

  onSearch() {

  }

  ngOnDestroy() {
    this.brandSub.unsubscribe();
    this.fuelTypeSub.unsubscribe();
    this.gearboxTypeSub.unsubscribe();
    this.modelSub.unsubscribe();
    this.priceRanges.unsubscribe();
  }


}
