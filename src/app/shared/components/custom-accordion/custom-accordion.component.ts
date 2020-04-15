import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-custom-accordion',
  templateUrl: './custom-accordion.component.html',
  styleUrls: ['./custom-accordion.component.sass']
})
export class CustomAccordionComponent implements OnInit {

  @Input() isShow = false;
  @Input() title: string;
  constructor() { }

  ngOnInit(): void {
  }

  onToggle() {
    this.isShow = !this.isShow;
  }

}
