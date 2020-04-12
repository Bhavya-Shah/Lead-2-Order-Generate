import { Component, OnInit, OnDestroy } from '@angular/core';
import { faTimes, faExclamationCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass'],
})

export class LoginComponent implements OnInit, OnDestroy {
  faLock= faLock
  faTimes = faTimes
  faExclamationCircle = faExclamationCircle
  playVideo: HTMLVideoElement
  userSub: Subscription
  // errorMessage: boolean = false
  errorMessage: string = null

  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.authService.autoLogin()
    this.userSub = this.authService.user
      .subscribe(
        user => {
          const isAuth = !!user
          // console.log(isAuth);
          if (isAuth) {
            this.router.navigate(['/'])
          }
        }
      )
  }

  videoPlayer() {
    this.playVideo = document.querySelector('video')
    if (this.playVideo.pause) {
      this.playVideo.muted = true // important
      this.playVideo.play()
    }
    this.playVideo.classList.add('animated', 'fadeInLeftBig')
  }

  onSubmit(loginForm: NgForm) {
    // console.log(loginForm.value)
    const username = loginForm.value.username
    const password = loginForm.value.password
    this.spinner.show()
    this.authService.login(username, password)
      .subscribe(
        res => {
          this.spinner.hide()
          // this.errorMessage = false
          this.errorMessage = null
          console.log(res)
        },
        err => {
          this.spinner.hide()
          // this.errorMessage = true
          this.errorMessage = err
          console.log(err)
        }
      );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}