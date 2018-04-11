import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private location: Location) {
  }

  ngOnInit() {
  }

  goBack(): void {
    this.location.back();
  }
}
