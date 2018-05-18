import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {WeatherService} from '../weather.service';
import {CityWeatherDto} from '../cityWeatherDto';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  cityWeatherDtos: CityWeatherDto[];
  username: string;
  cityWeatherDto: CityWeatherDto;

  constructor(private route: ActivatedRoute, private ws: WeatherService, private http: HttpClient) {
  }

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.getCities();
  }

  getCities() {
    const ids = [];
    this.http.get('http://localhost:3000/cities?uid=1').subscribe(
      cityIdObj => {
        Object.values(cityIdObj).forEach(x => {
          ids.push(x.id);
        });
        this.ws.getWeatherByCities(ids).subscribe(
          data => {
            this.cityWeatherDtos = data['list'];
          }, err => {
            console.log(err);
          }
        );
      }
    );
  }

  addCity(cityName: string) {
    this.ws.getWeatherByCity(cityName).subscribe(
      data => {
        this.cityWeatherDto = new CityWeatherDto();
        this.cityWeatherDto.main = data['main'];
        this.cityWeatherDto.name = data['name'];
        const cid = data['id'];
        this.http.post(`http://localhost:3000/city?cid=${cid}`, null).subscribe(
          x => {
            this.getCities();
          });
      });
  }

  deleteCity(cityId: string) {
    this.http.delete(`http://localhost:3000/city?cid=${cityId}`).subscribe(
      x => {
        this.getCities();
      }
    );
  }
}
