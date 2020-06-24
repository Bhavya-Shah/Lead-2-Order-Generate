import { Component, OnInit } from '@angular/core';
import { faTimes, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { UserDetailsService } from '../../services/user-details.service';
import { PersonalDetails } from '../../models/personal-details.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { MaintainUserDataService } from '../../services/maintain-user-data.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';

@Component({
    selector: 'app-personal-details',
    templateUrl: 'personal-details.component.html',
    styleUrls: ['personal-details.component.sass']
})
export class PersonalDetailsComponent implements OnInit {
    faTimes = faTimes;
    faExclamationCircle = faExclamationCircle;
    details: PersonalDetails;
    errorMessage: { ErrorMessage: string, MemberNames: string[], Property: string }[] = [];
    isDataAvailable = false;
    personalDetailsForm: FormGroup;

    constructor(
        private udService: UserDetailsService,
        private mudService: MaintainUserDataService,
        private datePipe: DatePipe,
        private spinner: NgxSpinnerService,
        private router: Router
    ) { }

    ngOnInit() {
        this.initializeForm();
        this.udService.getUserPersonalDetails()
            .subscribe(details => {
                this.details = details;
                this.isDataAvailable = true;
                this.initializeForm();
            });
    }

    initializeForm() {
        let firstname = '';
        let lastname = '';
        let dob = '';
        let contact = '';
        let houseno = 0;
        let street = '';
        let pin = '';
        let town = '';
        if (this.isDataAvailable) {
            firstname = this.details.Firstname;
            lastname = this.details.Lastname;
            dob = this.datePipe.transform(new Date(this.details.DOB), 'yyyy-MM-dd');
            contact = this.details.Contact;
            houseno = this.details.HouseNo;
            street = this.details.Street;
            pin = this.details.PIN;
            town = this.details.Town;
        }
        this.personalDetailsForm = new FormGroup({
            Firstname: new FormControl(firstname, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,20}$')]),
            Lastname: new FormControl(lastname, [Validators.required, Validators.pattern('^[a-zA-Z0-9]{3,20}$')]),
            DOB: new FormControl(dob, [Validators.required]),
            Contact: new FormControl(contact, [Validators.required]),
            HouseNo: new FormControl(houseno, [Validators.required]),
            Street: new FormControl(street, [Validators.required]),
            Town: new FormControl(town, [Validators.required]),
            PIN: new FormControl(pin, [Validators.required])
        });
    }

    onSubmit() {
        this.spinner.show();
        console.log(this.personalDetailsForm.value);
        this.udService.setUserPersonalDetaiils(this.personalDetailsForm.value)
            .subscribe(
                result => {
                    this.spinner.hide();
                    console.log(result);
                    this.mudService.setPersonalDetails(this.personalDetailsForm.value);
                    this.router.navigate(['/user', 'employment-details']);
                },
                error => {
                    this.spinner.hide();
                    this.errorMessage = error;
                }
            );
    }

}