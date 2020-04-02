import { Component, OnInit, AfterViewInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit, AfterViewInit {
  faTimes = faTimes;
  faExclamationCircle = faExclamationCircle;
  playVideo: HTMLMediaElement

  constructor(){ }

  ngOnInit(): void {
   }

   ngAfterViewInit(){
    this.playVideo = document.querySelector('video')
    if(this.playVideo.pause || this.playVideo.readyState == 4){
      this.playVideo.muted = true // important
      this.playVideo.play()
    } 
   }

  onSubmit(loginForm: NgForm) {
    console.log(document.querySelector('video').readyState)
    console.log(loginForm);
  }
}
