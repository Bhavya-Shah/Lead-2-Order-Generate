import { Component, OnInit } from '@angular/core';
import { faExclamationCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit {
  faLock = faLock
  faExclamationCircle = faExclamationCircle;
  faEnvelope = faEnvelope
  notification: boolean = false
  errorMessage: any = null
  constructor(
    private passwordservice: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(forgotPasswordForm: NgForm) {
    this.router.navigate(['/auth/forgot-password'], { queryParams: forgotPasswordForm.value })
    this.spinner.show()
    this.passwordservice.getPassword(forgotPasswordForm.value.email).subscribe(
      res => {
        this.spinner.hide()
        this.notification = true
        this.errorMessage = null
        console.log(res)
      },
      err => {
        this.notification = false
        this.errorMessage = err
        this.spinner.hide()
        console.log(err)
      }
    )
  }
}
