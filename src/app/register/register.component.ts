import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {User} from '../user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User = {
    name: '',
    username: '',
    password: '',
  };
  msg = '';
  errorMsg = '';

  constructor(private location: Location, private http: HttpClient) {
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }

  signUp() {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/user', {'name': this.user.name, 'username': this.user.username, 'password': this.user.password},
      {headers: headers}).subscribe(
      x => {
        this.msg = `${this.user.name} has added.`;
        this.errorMsg = '';
      }, err => {
        if (err.status === 400) {
          this.msg = '';
          this.errorMsg = 'Please fill all entries.';
        }
        if (err.status === 403) {
          this.msg = '';
          this.errorMsg = 'Username already exist. Please be more creative.';
        }
      }
    );
  }
}
