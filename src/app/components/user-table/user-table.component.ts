import { ValidationResponse } from '../../models/validation-response.model';
import { NumberService } from '../../services/number.service';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

export interface User {
  valid: boolean;
  number: string;
  location: string;
  country_name: string;
  carrier: string;
}

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent {
  @Input() userData: any[] = [];

  constructor(private numberService: NumberService) { }

  displayedColumns: string[] = ['valid', 'number', 'country_name', 'carrier'];
}
