import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CountriesResponse } from '../models/country-response.model';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countryInfoUrl = 'https://restcountries.com/v2/all';

  constructor(private httpClient: HttpClient) {
  }

  getCountrysInfo(): Observable<CountriesResponse[]> {
    return this.httpClient.get<CountriesResponse[]>(this.countryInfoUrl);
  }

}
