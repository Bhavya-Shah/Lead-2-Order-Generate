import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FilterbarComponent implements OnInit {

  constructor(private carService: CarService) { }

  ngOnInit(): void {
  }

  onReset(){
    this.carService.resetAllCheckbox.next();
  }
}
