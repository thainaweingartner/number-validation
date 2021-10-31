import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ValidationResponse } from 'src/app/models/validation-response.model';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class UserTableComponent implements OnChanges{
  @Input() userData: any[] = [];
  @Output() public clear = new EventEmitter<void>();
  dataSource: MatTableDataSource<ValidationResponse>;

  displayedColumns: string[] = ['valid', 'number', 'country_name', 'carrier'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnChanges() {
    this.dataSource = new MatTableDataSource(this.userData)
    this.dataSource.paginator = this.paginator;
  }

  public clearTable(): void {
    this.clear.emit();
  }
}
