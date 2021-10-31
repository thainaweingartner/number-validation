import { TestBed } from '@angular/core/testing';
import { NumberService } from './number.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { buildNumberValidation } from '../test/build-number-validation';

const mockData = {
  api: 'https://apilayer.net/api/validate?access_key=eb588dbf70cb81df1c8d374269db9d18&number=5584994592656',
  data: buildNumberValidation(),
};

describe(NumberService.name, () => {
  let service: NumberService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NumberService]
    }).compileComponents();

    service = TestBed.inject(NumberService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify());

  it(`#${NumberService.prototype.validate.name} should return the validation of the number`, done => {
    service.validate('5584994592656').subscribe(response => {
      expect(response).toBeTruthy();
      expect(response.number).toBe("5584994592656");
      done();
    });
    httpController
      .expectOne(mockData.api)
      .flush(mockData.data);
  });

  it(`#${NumberService.prototype.validate.name} should throw if number length is less than 6 or greater than 15`, () => {
    expect(() => service.validate('')).toThrow();
    const values = [null, undefined, '', '3', '33', '333', '3333', '33333', '3333333333333333'];
    values.forEach(values => {
        expect(() => service.validate(values))
          .withContext(`Empty value: ${values}`)
          .toThrow();
      });
  });
});
