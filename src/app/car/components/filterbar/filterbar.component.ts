import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CarFilterService } from '../../services/car-filter.service';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FilterbarComponent implements OnInit {

  constructor(private carFilterService: CarFilterService) { }

  ngOnInit(): void {
  }

  onReset() {
    this.carFilterService.resetFilters();
  }
}
