import { ContryService } from './../services/contry.service';
import { NumberService } from './../services/number.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ValidationResponse } from '../models/validation-response.model';
import { ContriesResponse } from '../models/contry-response.model';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  @Output() userData: any[] = [];

  phoneNumber: number = 5555551234;
  contriesInfo: ContriesResponse[] = [];
  contryNumber: any;

  constructor(private numberService: NumberService, private contryService: ContryService) { }

  ngOnInit(): void {
    this.contryService.getContrysInfo().subscribe((response: ContriesResponse[]) => {
      this.contriesInfo = response
      this.contryNumber = response[0];
    }, error => console.log(error));
  }

  validateNumber() {
    this.numberService.validate(`${this.contryNumber.callingCodes[0]}${this.phoneNumber}`).subscribe((response: ValidationResponse) => {
      this.userData = [response];
    }, error => console.error(error));
  }
}
