import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {WeatherService} from '../service/weather/weather.service';
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

  constructor(private router: Router, private ws: WeatherService, private http: HttpClient) {
  }

  ngOnInit() {
    this.username = sessionStorage.getItem('username');
    if (!this.username) {
      this.signOut();
    }
    this.getCities();
  }

  getCities() {
    const ids = [];
    this.http.get(`http://localhost:3000/cities?username=${sessionStorage.getItem('username')}`).subscribe(
      cityIdObj => {
        if (Object.values(cityIdObj).length > 0) {
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
        } else {
          this.cityWeatherDtos = null;
        }
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
        this.http.post(`http://localhost:3000/city`, {cid, username: sessionStorage.getItem('username')}).subscribe(
          () => {
            this.getCities();
          }, error => {
            if (error.message === 'DUPLICATE_REQUEST') {
              console.log('Duplicated Requests Found');
            } else {
              console.error('Error returned: ' + error.message);
            }
          });
      });
  }

  deleteCity(cityId: string) {
    this.http.delete(`http://localhost:3000/city?cid=${cityId}&username=${sessionStorage.getItem('username')}`).subscribe(
      () => {
        this.getCities();
      }
    );
  }

  signOut() {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('name');
    this.router.navigate(['/']);
  }
}
