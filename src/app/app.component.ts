import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City} from './city';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  http: HttpClient;
  title = 'Weather Information';
  url = 'http://api.openweathermap.org/data/2.5/weather?appid=c607d93e973983f09ff1b3121d21425c&units=metric';
  wd = '';

  @Input()
  city: City = new City();

  constructor(private ht: HttpClient) {
    this.http = ht;
  }

  ngOnInit() {
  }

  showCityWeather() {
    const query = this.url + '&q=' + this.city.name;
    console.log(query);

    const cityWeatherTemp = this.http.get(query).subscribe(
      data => this.wd = data['main'].temp,
      msg => console.log('observer error: ' + msg));
  }
}
