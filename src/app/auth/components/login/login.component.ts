import { Component, OnInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  faTimes = faTimes;
  faExclamationCircle = faExclamationCircle;

  constructor() { }

  ngOnInit(): void {
    var playVideo = document.querySelector('video')
    if(playVideo.pause){
      playVideo.muted = true //Important
      playVideo.play()
    }
    else {
      playVideo.muted = true
      playVideo.play()
    }
  }

  onSubmit(loginForm: NgForm){
    console.log(loginForm);
  }
}
