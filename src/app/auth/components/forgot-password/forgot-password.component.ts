import { Component, OnInit, OnDestroy } from '@angular/core';
import { faExclamationCircle, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.sass']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  faLock = faLock;
  faExclamationCircle = faExclamationCircle;
  faEnvelope = faEnvelope;
  notification = false;
  errorMessage: string = null;
  userSub: Subscription;
  constructor(
    private authService: AuthService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user
      .subscribe(
        user => {
          const isAuth = !!user;
          // console.log(isAuth)
          if (isAuth) {
            this.router.navigate(['car']);
          }
        }
      );
  }

  onSubmit(forgotPasswordForm: NgForm) {
    this.router.navigate(['/auth/forgot-password'], { queryParams: forgotPasswordForm.value });
    this.spinner.show();
    this.authService.getPassword(forgotPasswordForm.value.email).subscribe(
      res => {
        this.spinner.hide();
        this.notification = true;
        this.errorMessage = null;
      },
      err => {
        this.notification = false;
        this.errorMessage = err.ErrorMessage;
        this.spinner.hide();
        console.log(err);
      }
    );
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
