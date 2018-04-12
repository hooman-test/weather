import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../weather.service';
import {CityWeatherDto} from '../cityWeatherDto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cityWeatherDtos: CityWeatherDto[];
  username: string;

  constructor(private route: ActivatedRoute, private ws: WeatherService) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getCities();
  }

  getCities() {
    this.ws.getWeatherByCities([112931, 2147714, 2642802]).subscribe(
      data => {
        this.cityWeatherDtos = data['list'];
      }, err => {
        console.log(err);
      }
    );
  }
}
