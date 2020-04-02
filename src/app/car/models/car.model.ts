import { Brand } from './brand.model';
import { Fuel } from './fuel.model';
import { Gearbox } from './gearbox.model';

export class Car{
  constructor(
    public CarId: number,
    public Carname: string,
    public Brand: Brand,
    public Fuelbox: Fuel,
    public Gearbox: Gearbox,
    public Model: string,
    public Color:string,
    public Price: number,
    public CO2Emission
  ){}
}
