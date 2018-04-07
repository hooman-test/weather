import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {WeatherCondition} from './weatherCondition';

@Injectable()
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/weather?appid=c607d93e973983f09ff1b3121d21425c&units=metric';

  constructor(private http: HttpClient) {
  }

  getWeatherByCity(city: string): Observable<WeatherCondition> {
    const query = this.url + '&q=' + city;
    console.log('query is: ' + query);
    return this.http.get<WeatherCondition>(query);
  }
}
