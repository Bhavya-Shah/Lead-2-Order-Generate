import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private httpclient: HttpClient) { }

  getPassword(email){
    return this.httpclient.get('http://localhost:52778/api/user', {
      params: new HttpParams().set('email', email)
    })
  }
}
