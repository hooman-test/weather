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

  constructor(private ws: WeatherService) {
  }

  ngOnInit() {
  }

  lookupCityWeather(city: City) {
    console.log('comp');
    this.ws.getWeatherByCity(city).subscribe(
      data => {
        this.wc = data['main'];
        this.city.name = data['name'];
      },
      msg => console.log('observer error: ' + msg));
  }
}
