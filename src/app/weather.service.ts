import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {WeatherCondition} from './weatherCondition';
import {CityWeatherDto} from './cityWeatherDto';

@Injectable()
export class WeatherService {
  url = 'http://api.openweathermap.org/data/2.5/weather?appid=c607d93e973983f09ff1b3121d21425c&units=metric';
  group_url = 'http://api.openweathermap.org/data/2.5/group?appid=c607d93e973983f09ff1b3121d21425c&units=metric';

  constructor(private http: HttpClient) {
  }

  getWeatherByCity(cityName: string): Observable<WeatherCondition> {
    const query = this.url + '&q=' + cityName;
    console.log('query is: ' + query);
    return this.http.get<WeatherCondition>(query);
  }

  getWeatherByCities(cityIds: number[]): Observable<CityWeatherDto[]> {
    let ids = '';
    cityIds.forEach(x => ids += x + ',');
    ids = ids.substring(0, ids.length - 1); // Removing last comma
    const query = this.group_url + '&id=' + ids;
    return this.http.get<CityWeatherDto[]>(query);
  }
}
