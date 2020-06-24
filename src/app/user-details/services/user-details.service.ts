import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { MaintainUserDataService } from './maintain-user-data.service';
import { PersonalDetails } from '../models/personal-details.model';
import { throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDetailsService {

    getPersonalDetailsUrl = 'http://localhost:52778/user/getUserDetails';
    setPersonalDetailsUrl = 'http://localhost:52778/user/addUserDetails';

    constructor(
        private http: HttpClient,
        private mudService: MaintainUserDataService
    ) { }

    getUserPersonalDetails() {
        return this.http.get<PersonalDetails>(this.getPersonalDetailsUrl)
            .pipe(
                tap(details => {
                    this.mudService.setPersonalDetails(details);
                })
            );
    }

    setUserPersonalDetaiils(details: PersonalDetails) {
        return this.http.post(this.setPersonalDetailsUrl, details)
            .pipe(
                catchError(httpErrorResponse => {
                    const errorMessage = {
                        ErrorMessage: 'An unknown error occurred!',
                        Property: 'none'
                    };
                    if (!httpErrorResponse.error || !httpErrorResponse.error.Message) {
                        return throwError([errorMessage]);
                    }
                    // console.log(JSON.parse(httpErrorResponse.error.Message));
                    return throwError(JSON.parse(httpErrorResponse.error.Message));
                }));
    }
}