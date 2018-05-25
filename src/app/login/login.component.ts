import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit() {
  }

  login(user: string, pass: string) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');

    this.http.post('http://localhost:3000/user/login', {'username': user, 'password': pass}, {headers: headers}).subscribe(
      name => {
        sessionStorage.setItem('name', name.toString());
        this.router.navigateByUrl(`/user/${user}`);
      }
    );
  }

}
