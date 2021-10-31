import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UserTableComponent } from './../components/user-table/user-table.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NumberService } from 'src/app/services/number.service';
import { CountryService } from 'src/app/services/country.service';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { HomeComponent } from './home.component';
import { HttpClientModule } from '@angular/common/http';
import { buildCountryList } from '../test/build-country-list';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { NgxMaskModule } from 'ngx-mask';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { buildNumberValidation } from '../test/build-number-validation';

describe(HomeComponent.name, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let countryService: CountryService;
  let numberService: NumberService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeComponent, UserTableComponent ],
      imports: [
        HttpClientModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatIconModule,
        MatButtonModule,
        MatSelectModule,
        FormsModule,
        MatTableModule,
        ReactiveFormsModule,
        NgxMaskModule.forRoot(),
      ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    countryService = TestBed.inject(CountryService);
    numberService = TestBed.inject(NumberService);
  });

  it(`Should display coutry code when data arrives`, () => {
    const countries = buildCountryList();
    spyOn(countryService, 'getCountrysInfo')
      .and.returnValue(of(countries));
    fixture.detectChanges();
    const select = fixture.nativeElement
      .querySelector('mat-select');
    const loader = fixture.nativeElement
      .querySelector('.loader');
    expect(select).withContext('Should display select with countries')
      .not.toBeNull();
    expect(loader).withContext('Should not display loader')
      .toBeNull();
  });

  // it(`${HomeComponent.name} number shouldnt be shorter than 4 or longer than 12`, () => {
  //   const inputNumber = fixture.nativeElement.querySelector('.number-input');
  //   expect(inputNumber).toBeGreaterThan(3);
  //   expect(inputNumber).toBeLessThan(12);
  //     //simular preenchimento do formulário e validação
  // });

  // it(`${HomeComponent.name} should click the button and call the valitation`, () => {
  //   //simular preenchimento do formulário e click do botão
  //   component.phoneNumberForm = {
  //     phoneNumber: '84994592656',
  //     countryNumber: '',
  //   },
  //   const numberValidation = buildNumberValidation();
  //   const button = fixture.nativeElement
  //     .querySelector('.button');
  //   fixture.detectChanges();
  //   expect(numberService.validate).toHaveBeenCalled();
  // });

  it('Should test form validity', () => {
    fixture.detectChanges();
    const form = component.phoneNumberForm;
    const phoneNumberInput = form.controls.phoneNumber;
    const countryNumberInput = form.controls.countryNumber;

    expect(form.valid).toBeFalsy();

    phoneNumberInput.setValue('84994592656');
    countryNumberInput.setValue({
      callingCodes: ['55'],
    });

    expect(form.valid).toBeTruthy();
  })

  it(`OnInit should render input and select elements`, () => {
    const countries = buildCountryList();
    spyOn(countryService, 'getCountrysInfo')
    .and.returnValue(of(countries));
    fixture.detectChanges();
    const inputNumber = fixture.nativeElement.querySelector('.number-input');
    const inputCountry = fixture.nativeElement.querySelector('.country-field');
    expect(inputNumber).toBeTruthy();
    expect(inputCountry).toBeTruthy();
  });

  it(`#${HomeComponent.prototype.validateNumber.name} should display table when called`, () => {
    const numberValidation = buildNumberValidation();
    spyOn(numberService, 'validate')
      .and.returnValue(of(numberValidation));
    fixture.detectChanges();
    const table = fixture.nativeElement
      .querySelector('app-user-table');
    expect(table).toBeTruthy();
  });

  //corrigir
  it(`#${HomeComponent.prototype.openPopUp.name} should open when validate a number`, () => {
    const numberValidation = buildNumberValidation();
    spyOn(component.popUp,"open").and.callThrough();
    component.openPopUp(numberValidation.valid);
    expect(component.popUp.open).toHaveBeenCalled();
  });

  //corrigir
  it(`#${HomeComponent.prototype.openPopUp.name} should contain the validation response when opened`, () => {
    const numberValidation = buildNumberValidation();
    spyOn(component.popUp,"open").and.callThrough();
    component.openPopUp(numberValidation.valid);
    expect(component.popUp.open).toHaveBeenCalled();
  });
})
