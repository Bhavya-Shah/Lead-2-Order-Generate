import { Component, OnInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  faTimes = faTimes
  faExclamationCircle = faExclamationCircle
  playVideo: HTMLMediaElement
  userSub: Subscription
  errorMessage: any = []

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
          // console.log(isAuth)
          if (isAuth) {
            this.router.navigate(['/'])
          }
        }
      );
  }

  videoPlayer() {
    this.playVideo = document.querySelector('video')
    if (this.playVideo.pause) {
      this.playVideo.muted = true // important
      this.playVideo.play()
    }
    this.playVideo.classList.add('animated', 'fadeInRightBig')
  }

  onSubmit(registerForm: NgForm) {
    // console.log(registerForm.value)
    const username = registerForm.value.username
    const email = registerForm.value.email
    const password = registerForm.value.password
    this.spinner.show()
    this.authService.register(username, email, password)
      .subscribe(
        res => {
          this.spinner.hide()
          this.router.navigate(['auth', 'login'])
          this.errorMessage = null
          // console.log(res)
        },
        err => {
          this.spinner.hide()
          this.errorMessage = err
          // console.log(err)
        }
      )
  }

  ngOnDestroy() {
    this.userSub.unsubscribe()
  }
}