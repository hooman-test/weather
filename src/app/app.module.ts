import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {WeatherLookupComponent} from './weather-lookup/weather-lookup.component';
import {WeatherService} from './weather.service';
import {LoginComponent} from './login/login.component';
import {AppRoutingModule} from './/app-routing.module';
import {RegisterComponent} from './register/register.component';
import {DashboardComponent} from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    WeatherLookupComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
