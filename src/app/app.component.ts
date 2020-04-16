import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { fader } from './shared/services/route-animations'
import { AuthService } from './auth/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
  animations: [
    fader
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autoLogin();
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
  }
}
