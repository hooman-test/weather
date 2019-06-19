import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {WeatherLookupComponent} from './weather-lookup/weather-lookup.component';
import {WeatherService} from './service/weather/weather.service';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './app-routing.module';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProfileComponent} from './profile/profile.component';
import {AuthService} from './service/auth/auth.service';
import {DoubleSubmissionInterceptor} from './interceptors/DoubleSubmissionInterceptor';
import {LoggingInterceptor} from './interceptors/LoggingInterceptor';

@NgModule({
  declarations: [
    AppComponent,
    WeatherLookupComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    WeatherService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: DoubleSubmissionInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
