import {Component, OnInit} from '@angular/core';
import {WeatherService} from '../weather.service';
import {CityWeatherDto} from '../cityWeatherDto';

@Component({
  selector: 'app-weather-lookup',
  templateUrl: './weather-lookup.component.html',
  styleUrls: ['./weather-lookup.component.css']
})
export class WeatherLookupComponent implements OnInit {
  status: boolean;
  errorMessage: string;
  cityWeatherDto: CityWeatherDto;

  constructor(private ws: WeatherService) {
  }

  ngOnInit() {
  }

  lookupCityWeather(city: string) {
    this.ws.getWeatherByCity(city).subscribe(
      data => {
        this.status = true;
        this.cityWeatherDto = new CityWeatherDto();
        this.cityWeatherDto.weatherInfo = data['main'];
        this.cityWeatherDto.cityName = data['name'];
      },
      res => {
        this.status = false;
        this.errorMessage = res.error.message;
      });
  }
}
