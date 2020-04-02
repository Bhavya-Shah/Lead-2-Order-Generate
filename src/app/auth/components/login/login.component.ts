import { Component, OnInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  faTimes = faTimes
  faExclamationCircle = faExclamationCircle;
  playVideo: HTMLVideoElement
  constructor() { }

  ngOnInit(): void {
    this.playVideo = document.querySelector('video')
    if(this.playVideo.pause){
      this.playVideo.muted = true // important
      this.playVideo.play()
    }
  }

  onSubmit(loginForm: NgForm) {
    console.log(document.querySelector('video').readyState)
    console.log(loginForm);
  }
}
