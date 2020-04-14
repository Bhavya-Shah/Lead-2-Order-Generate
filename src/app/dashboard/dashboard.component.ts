import { Component, OnInit } from '@angular/core';
import { DataManagementService } from 'src/app/shared/services/data-management.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  constructor(
    private dmService: DataManagementService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.dmService.getCarData().subscribe();
  }
  onSubmit(){
    // write the logic here
  }
}
