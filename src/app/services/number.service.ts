import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ValidationResponse } from '../models/validation-response.model';

const ACCESS_KEY = 'eb588dbf70cb81df1c8d374269db9d18';

@Injectable({
  providedIn: 'root'
})
export class NumberService {
  private numberData: any = {};
  private url = `https://apilayer.net/api/validate`;

  constructor(private httpClient: HttpClient) {}

  validate(phoneNumber: string): Observable<ValidationResponse> {
    const numberLenght = phoneNumber.length;
    if (!phoneNumber || numberLenght > 14 || numberLenght < 6) {
      throw Error('Phone number can not be empty');
    }
    const queryParams = {
      access_key: ACCESS_KEY,
      number: phoneNumber,
    }
    return this.httpClient.get<ValidationResponse>(this.url, {params: queryParams});
  }

  setUser(user: ValidationResponse) {
    this.numberData = user;
  }

  getNumberData(): Observable<ValidationResponse> {
    return this.numberData;
  }
}
