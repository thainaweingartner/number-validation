import { NumberService } from './services/number.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'numbervalidation';

  // constructor(private service: NumberService) {}

  // validateNumber($event: any) {
  //   this.service.validate($event);
  // }
}
