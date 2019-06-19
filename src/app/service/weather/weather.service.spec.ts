import {getTestBed, TestBed} from '@angular/core/testing';

import {WeatherService} from './weather.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

describe('WeatherService', () => {
  let injector: TestBed;
  let service: WeatherService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService]
    });
    injector = getTestBed();
    service = injector.get(WeatherService);
    httpMock = injector.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    const wService: WeatherService = TestBed.get(WeatherService);
    expect(wService).toBeTruthy();
  });
});
