import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  faTimes = faTimes;
  faExclamationCircle = faExclamationCircle;
  playVideo: HTMLMediaElement

  constructor() { }

  ngOnInit(): void {
  }

  videoPlayer() {
    this.playVideo = document.querySelector('video')
    if (this.playVideo.pause) {
      this.playVideo.muted = true // important
      this.playVideo.play()
    }
    this.playVideo.classList.add("animated", "fadeInRightBig")
  }

  onSubmit(loginForm: NgForm) {
    console.log(loginForm);
  }
}
