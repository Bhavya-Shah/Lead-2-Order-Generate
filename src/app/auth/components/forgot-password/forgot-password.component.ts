import { Component, OnInit } from '@angular/core';
import { faExclamationCircle, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import {AuthService} from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  emailAddress: any = ""
  faLock=faLock
  faExclamationCircle=faExclamationCircle
  constructor(private passwordservice: AuthService,
    private router: Router) { }

  ngOnInit(): void {
  }

  // onSubmit(forgotPasswordForm: NgForm){
  // console.log(this.emailAddress)
  // this.router.navigate(['/auth/forgot-password'], {queryParams: forgotPasswordForm.value})
  // this.passwordservice.getPassword(forgotPasswordForm.value).subscribe()  
  // console.log(forgotPasswordForm.value)
  // }

  onSubmit(){
    this.router.navigate(['/auth/forgot-password'], {queryParams: {email: this.emailAddress}})
    this.passwordservice.getPassword(this.emailAddress).subscribe()
    console.log(this.emailAddress)
  }

  // ngOnDestroy(){
  //   this.passwordservice.getPassword(this.emailAddress).unsubscribe()
  // }
}
