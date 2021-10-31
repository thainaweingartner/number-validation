import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CountryService } from './../services/country.service';
import { NumberService } from './../services/number.service';
import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ValidationResponse } from '../models/validation-response.model';
import { CountriesResponse } from '../models/country-response.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { customValidationService } from '../utils/custom-validator';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit{

  @Output() userData: any[] = [];

  countriesInfo: CountriesResponse[] = [];
  phoneNumberForm: FormGroup =  new FormGroup({
    phoneNumber: new FormControl(),
    countryNumber: new FormControl(),
  });;

  constructor(private numberService: NumberService, private countryService: CountryService, public popUp: MatSnackBar, public warningPopUp: MatSnackBar) { }

  ngOnInit(): void {
    this.countryService.getCountrysInfo().subscribe((response: CountriesResponse[]) => {
      this.countriesInfo = response
      this.formBuilder(response);
    }, error => console.log(error));
    this.formBuilder();
  }

  private formBuilder(response?: CountriesResponse[]) {
    this.phoneNumberForm = new FormGroup({
      phoneNumber: new FormControl('', [Validators.required, customValidationService.checkLimit(1000, 999999999999), Validators.pattern('[0-9]*')]),
      countryNumber: new FormControl(response? response[218] : {callingCodes: ['']}, Validators.required),
    });
  }

  public validateNumber() {
    const form = this.phoneNumberForm.getRawValue();
    const completeNumber = `${form.countryNumber.callingCodes[0]}${form.phoneNumber}`;

    const alreadyValidated = this.userData.find(user => user.number == completeNumber);

    if(alreadyValidated) {
      this.openWarningPopUp('Number already validated, please check the table')
    } else {
      this.numberService
        .validate(completeNumber)
        .subscribe((response: ValidationResponse) => {

          if(response.valid) {
            const newUserData:ValidationResponse[] = [...this.userData]
            newUserData.push(response)
            this.userData = newUserData;
          }
          this.openPopUp(response.valid);
          this.phoneNumberForm.controls['phoneNumber'].reset()
      }, error => console.error(error));
    }
  }

  public clearTable() {
    this.userData = []
  }

  public getSelectedCountryNumber() {
    return this.phoneNumberForm.get('countryNumber').value;
  }

  public openPopUp(validation: boolean) {
    this.popUp.open(`This number is ${validation ? 'valid' : 'invalid'}!`, '', {
      panelClass: validation ? 'custom-snackbar-valid' : 'custom-snackbar-invalid',
      verticalPosition: 'top',
    });
  }

  public openWarningPopUp(message: string) {
    this.warningPopUp.open(message, '', {
      panelClass:'custom-snackbar-warning',
      duration: 30000,
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.phoneNumberForm.controls[controlName].hasError(errorName);
  }
}
