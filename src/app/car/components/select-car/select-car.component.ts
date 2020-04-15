import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { ActivatedRoute } from '@angular/router';
import { CarService } from '../../services/car.service';
import { Brand } from '../../models/brand.model';
import { Subscription } from 'rxjs';
import { Fuel } from '../../models/fuel.model';
import { Gearbox } from '../../models/gearbox.model';
import { Car } from '../../models/car.model';

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

  constructor(
    private dmService: DataManagementService,
    private router: ActivatedRoute,
    private carService: CarService
  ) {}

  ngOnInit(): void {
    if (!this.carService.hasData()) {
      this.dmService.getCarData().subscribe();
    }
  }

  getSelectedBrands(brands: Brand[]) {
    this.selectedBrands = brands;
  }
  getSelectedModels(cars: Car[]) {
    this.selectedModels = cars;
  }
  getSelectedGearboxTypes(gearboxTypes: Gearbox[]) {
    this.selectedGearboxTypes = gearboxTypes;
  }
  getSelectedFuelTypes(fuelTypes: Fuel[]) {
    this.selectedFuelTypes = fuelTypes;
  }

  onSearch() {
    console.log(this.selectedBrands);
    console.log(this.selectedFuelTypes);
    console.log(this.selectedGearboxTypes);
    console.log(this.selectedModels);
  }

  ngOnDestroy() {
    this.brandSub.unsubscribe();
  }


}
