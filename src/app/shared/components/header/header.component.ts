import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit, OnDestroy {

  constructor(private authService: AuthService) { }
  username: string = null;
  userSub: Subscription;
  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe((user) => {
      const isAuth = !!user;
      if (isAuth) {
        this.username = user.username.toUpperCase();
      } else {
        this.username = null;
      }
    });
  }
  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
