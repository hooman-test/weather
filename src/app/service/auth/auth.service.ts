import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(user: string, pass: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/user/login', {'username': user, 'password': pass}, {headers: headers});
  }

}

