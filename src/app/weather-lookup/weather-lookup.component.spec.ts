import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {WeatherLookupComponent} from './weather-lookup.component';
import {WeatherService} from '../service/weather/weather.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WeatherLookupComponent', () => {
  let component: WeatherLookupComponent;
  let fixture: ComponentFixture<WeatherLookupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [WeatherService],
      declarations: [WeatherLookupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
