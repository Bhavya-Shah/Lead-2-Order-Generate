import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { animateChild } from '@angular/animations';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.sass']
})
export class CustomAccordionComponent implements OnInit {

  @Input() isShow = true;
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.isShow = !this.isShow;
  }

}
