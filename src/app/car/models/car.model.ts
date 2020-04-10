import { Brand } from './brand.model';
import { Fuel } from './fuel.model';
import { Gearbox } from './gearbox.model';

export class Car{
  public LeasePrice: number;
  constructor(
    public CarId: number,
    public Carname: string,
    public Brand: Brand,
    public Fuel: Fuel,
    public Gearbox: Gearbox,
    public Model: string,
    public Color: string,
    public Price: number,
    public CO2Emission: number
  ){}
}
