import { Component, OnInit, HostListener } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  faTimes=faTimes
  faExclamationCircle=faExclamationCircle

  constructor() { }

  onSubmit(){
  } 

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
}
