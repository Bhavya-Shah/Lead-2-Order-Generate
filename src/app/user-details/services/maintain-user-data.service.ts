import { Injectable } from '@angular/core';
import { PersonalDetails } from '../models/personal-details.model';
import { PersonalDetailsComponent } from '../components/personal-details/personal-details.component';

@Injectable({ providedIn: 'root'})
export class MaintainUserDataService {
    UserPersonalDetails: PersonalDetails;

    getPersonalDetails(): PersonalDetails {
        return {...this.UserPersonalDetails};
    }
    setPersonalDetails(details: PersonalDetails) {
        this.UserPersonalDetails = details;
    }
}