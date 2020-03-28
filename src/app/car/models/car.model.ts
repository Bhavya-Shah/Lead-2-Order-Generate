import { Brand } from './brand.model';
import { Fuel } from './fuel.model';
import { Gearbox } from './gearbox.model';

export class Car{
  constructor(
    public id: number,
    public model: string,
    public name: string,
    public brand: Brand,
    public fuelbox: Fuel,
    public gearbox: Gearbox,
    public price: number
  ){}
}
