import { Car } from 'src/app/car/models/car.model';
import { Brand } from 'src/app/car/models/brand.model';
import { Fuel } from 'src/app/car/models/fuel.model';
import { Gearbox } from 'src/app/car/models/gearbox.model';

export interface GetResponse{
  CarCount: number;
  Cars: Car[];
  BrandCount: number;
  Brands: Brand[];
  FuelTypeCount: number;
  FuelTypes: Fuel[];
  GearBoxTypeCount: number;
  GearBoxTypes: Gearbox[];
}
