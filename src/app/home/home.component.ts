import { CountryService } from './../services/country.service';
import { NumberService } from './../services/number.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidationResponse } from '../models/validation-response.model';
import { CountriesResponse } from '../models/country-response.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  @Output() userData: any[] = [];

  phoneNumber: number = 5555551234;
  countriesInfo: CountriesResponse[] = [];
  countryNumber: any;

  constructor(private numberService: NumberService, private countryService: CountryService, private popUp: MatSnackBar) { }

  ngOnInit(): void {
    this.countryService.getCountrysInfo().subscribe((response: CountriesResponse[]) => {
      this.countriesInfo = response
      this.countryNumber = response[31];
    }, error => console.log(error));
  }

  validateNumber() {
    this.numberService.validate(`${this.countryNumber.callingCodes[0]}${this.phoneNumber}`).subscribe((response: ValidationResponse) => {
      this.userData = [response];
      this.openPopUp(response.valid);
    }, error => console.error(error));
  }

  openPopUp(validation: boolean) {
    this.popUp.open(`This number is ${validation ? 'valid' : 'invalid'}!`, '', {
      panelClass: validation ? 'my-custom-snackbar-valid' : 'my-custom-snackbar-invalid'
    });
  }
}
