import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {AuthService} from '../service/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private http: HttpClient, private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
  }

  login(user: string, pass: string) {
    this.auth.login(user, pass).subscribe(
      name => {
        sessionStorage.setItem('name', name.toString());
        sessionStorage.setItem('username', user);
        this.router.navigateByUrl(`/user/${user}`);
      });
  }
}
