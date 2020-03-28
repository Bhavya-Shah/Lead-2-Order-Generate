import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filterbar',
  templateUrl: './filterbar.component.html',
  styleUrls: ['./filterbar.component.sass'],
  encapsulation: ViewEncapsulation.None
})
export class FilterbarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
