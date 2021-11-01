import { FormGroup, Validators, FormControl } from '@angular/forms';
import { CountryService } from './../services/country.service';
import { NumberService } from './../services/number.service';
import { Component, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { ValidationResponse } from '../models/validation-response.model';
import { CountriesResponse } from '../models/country-response.model';
import {MatSnackBar} from '@angular/material/snack-bar';
import { customValidationService } from '../utils/custom-validator';
import { ErrorResponse } from '../models/error-reponse.model';

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
      const countries: CountriesResponse[] = response;
      countries.forEach(country => {
        if(country.callingCodes.length > 1 ) {
          for(let i = 1; i < country.callingCodes.length; i++) {
            countries.push({
              ...country,
              callingCodes: [country.callingCodes[i]],
            })
          }
        }
      })
      this.countriesInfo = countries.sort((a, b) => a.name.localeCompare(b.name));
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
          if(response.success == false){
            this.errorDealing(response.error)
          } else {
            if(response.valid) {
              const newUserData:ValidationResponse[] = [...this.userData]
              newUserData.push(response)
              this.userData = newUserData;
            }
            this.openPopUp(response.valid);
            this.phoneNumberForm.controls['phoneNumber'].reset()
          }
      }, error => {throw Error(error)});
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
      panelClass: validation ? ['custom-snackbar', 'valid' ] : ['custom-snackbar', 'invalid'],
      verticalPosition: 'top',
    });
  }

  public openWarningPopUp(message: string) {
    this.warningPopUp.open(message, '', {
      panelClass:['custom-snackbar', 'warning'],
      duration: 30000,
    });
  }

  public hasError(controlName: string, errorName: string) {
    return this.phoneNumberForm.controls[controlName].hasError(errorName);
  }

  private errorDealing(error: any): void {
    if(error.code == 404) this.openWarningPopUp('Problem with validation request, we will fix the problem ASAP')
    if(error.code == 101 || error.code == 103) this.openWarningPopUp('Problem accessing the validation API, please again try later')
    if(error.code == 210 || error.code == 211 || error.code == 310) this.openWarningPopUp(error.info)
    if(error.code == 104) this.openWarningPopUp('You have exceeded the number of validation allowed monthly')
    if(error.code == 102) this.openWarningPopUp('Your account is not active. Please activate to use our services')
  }
}
