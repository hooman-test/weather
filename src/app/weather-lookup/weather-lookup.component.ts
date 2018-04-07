import {Component, Input, OnInit} from '@angular/core';
import {City} from '../city';
import {WeatherService} from '../weather.service';
import {WeatherCondition} from '../weatherCondition';

@Component({
  selector: 'app-weather-lookup',
  templateUrl: './weather-lookup.component.html',
  styleUrls: ['./weather-lookup.component.css']
})
export class WeatherLookupComponent implements OnInit {

  @Input()
  city: City = new City();
  wc: WeatherCondition = new WeatherCondition();
  status: boolean;
  errorMessage: string;

  constructor(private ws: WeatherService) {
  }

  ngOnInit() {
  }

  lookupCityWeather(city: string) {
    this.ws.getWeatherByCity(city).subscribe(
      data => {
        this.status = true;
        this.wc = data['main'];
        this.city.name = data['name'];
      },
      res => {
        this.status = false;
        this.errorMessage = res.error.message;
        console.log(res.error);
      });
  }
}
