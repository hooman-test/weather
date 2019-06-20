import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {LoginComponent} from './login.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {AuthService} from '../service/auth/auth.service';
import {HttpClient} from '@angular/common/http';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, HttpClient],
      declarations: [LoginComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have the login title', () => {
    const h3 = fixture.debugElement.query(By.css('h3'));
    expect(h3.nativeElement.innerHTML).toBe('Login');
  });

  it('should have one text input field with the name of username', () => {
    const username = fixture.debugElement.query(By.css('input[type=text]'));
    expect(username.nativeElement.type).toBe('text');
    expect(username.nativeElement.name).toBe('username');
  });

  it('should have one password input field with the name of password', () => {
    const password = fixture.debugElement.query(By.css('input[type=password]'));
    expect(password.nativeElement.type).toBe('password');
    expect(password.nativeElement.name).toBe('password');
  });

  it('should have register button', () => {
    const button = fixture.debugElement.query(By.css('input[type=button]'));
    expect(button.nativeElement.value).toBe('Register');
  });

  it('should have submit button with the value "Login"', () => {
    const submit = fixture.debugElement.query(By.css('input[type=submit]'));
    expect(submit.nativeElement.type).toBe('submit');
    expect(submit.nativeElement.value).toBe('Login');
  });

});
