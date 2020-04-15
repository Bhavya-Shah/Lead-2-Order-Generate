import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-steps-progress-bar',
  templateUrl: './steps-progress-bar.component.html',
  styleUrls: ['./steps-progress-bar.component.sass']
})
export class StepsProgressBarComponent implements OnInit {

  @Input() stepNo: number;
  steps: string[] = [
    'Select Vehicle',
    'Select Mileage and Payback Time',
    'Add Personal Details',
    'Add Employment Details',
    'Add Bank Details',
    'Generate Quote'
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
