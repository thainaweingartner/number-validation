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

  constructor(private httpClient: HttpClient) {
    this.numberData = {};
  }

  get numberInfo() {
    return this.numberData;
  }

  validate(phoneNumber: string): Observable<ValidationResponse> {
    const queryParams = {
      access_key: ACCESS_KEY,
      number: phoneNumber
    }
    return this.httpClient.get<ValidationResponse>(this.url, {params: queryParams});
  }

  setUser(user: ValidationResponse) {
    this.numberData = user;
  }

  getNumberData(): void {
    return this.numberData;
  }
}
