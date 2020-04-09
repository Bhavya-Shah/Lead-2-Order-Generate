import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import {
  faTimes,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})
export class LoginComponent implements OnInit, OnDestroy {
  faTimes = faTimes;
  faExclamationCircle = faExclamationCircle;
  playVideo: HTMLVideoElement;
  isLoading = false;
  userSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
    this.userSub = this.authService.user
      .subscribe(
        user => {
          const isAuth = !!user;
          console.log(isAuth);
          if (isAuth) {
            this.router.navigate(['/']);
          }
        }
      );
  }

  videoPlayer() {
    this.playVideo = document.querySelector('video');
    if (this.playVideo.pause) {
      this.playVideo.muted = true; // important
      this.playVideo.play();
    }
    this.playVideo.classList.add('animated', 'fadeInLeftBig');
  }

  onSubmit(loginForm: NgForm) {
    this.isLoading = true;
    console.log(this.isLoading);
    console.log(loginForm.value);
    const username = loginForm.value.username;
    const password = loginForm.value.password;
    this.authService.login(username, password)
      .subscribe(
        resData => {
          this.isLoading = false;
          console.log(resData);
        },
        errorMessage => {
          this.isLoading = false;
          console.log(errorMessage);
        }
      );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
