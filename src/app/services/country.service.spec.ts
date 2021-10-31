import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CountryService } from './country.service';

const mockData = {
  api: 'https://restcountries.com/v2/all',
};

describe(CountryService.name, () => {
  let service: CountryService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CountryService]
    }).compileComponents();

    service = TestBed.inject(CountryService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it(`#${CountryService.prototype.getCountrysInfo.name} should return information of 249 countries`, () => {
    service.getCountrysInfo().subscribe(response => {
      expect(response.length).toBe(249);
      expect(response[31].callingCodes[0]).toBe('55');
    });
    httpController.expectOne(mockData.api);
  });
});
