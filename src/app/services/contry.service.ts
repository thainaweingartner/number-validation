import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContriesResponse } from '../models/contry-response.model';

@Injectable({
  providedIn: 'root'
})
export class ContryService {
  private contrysData: any = [];
  private contryInfoUrl = 'https://restcountries.com/v2/all';

  constructor(private httpClient: HttpClient) {
    this.contrysData = {};
  }

  get contrysInfo() {
    return this.contrysData;
  }

  getContrysInfo(): Observable<ContriesResponse[]> {
    return this.httpClient.get<ContriesResponse[]>(this.contryInfoUrl);
  }

}
