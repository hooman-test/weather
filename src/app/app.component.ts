import {Component, Injectable, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {City} from './city';
import "rxjs/add/operator/map";
import {Observable} from "rxjs/Observable";
import {of} from 'rxjs/observable/of';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

@Injectable()
export class AppComponent implements OnInit {
  http: HttpClient;

  @Input()
  city: City = new City();

  constructor(private ht: HttpClient) {
    this.http = ht;
  }

  ngOnInit() {
  }

  title = 'Weather Information';
  url = 'http://api.openweathermap.org/data/2.5/weather?appid=c607d93e973983f09ff1b3121d21425c';
  wd = '';

  showCityWeather() {
    /*let query = this.url + "&q=" + this.city.name;
    console.log(query);
    let cityWeather = this.http.get(query).map(res => res.json());

    console.log(cityWeather);*/
  }

}
