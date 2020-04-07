import { Component, OnInit } from '@angular/core';
import { faExclamationCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  faLock=faLock
  faExclamationCircle=faExclamationCircle
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(forgotPasswordForm: NgForm){
    console.log(forgotPasswordForm)
  }
}
