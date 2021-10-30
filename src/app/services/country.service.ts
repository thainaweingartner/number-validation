import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountriesResponse } from '../models/country-response.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countrysData: any = [];
  private countryInfoUrl = 'https://restcountries.com/v2/all';

  constructor(private httpClient: HttpClient) {
    this.countrysData = {};
  }

  get countrysInfo() {
    return this.countrysData;
  }

  getCountrysInfo(): Observable<CountriesResponse[]> {
    return this.httpClient.get<CountriesResponse[]>(this.countryInfoUrl);
  }

}
