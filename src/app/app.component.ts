import { Component, OnInit } from '@angular/core';
import { HeaderService } from './headers/header.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [HeaderService],
})
export class AppComponent implements OnInit{

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.autoLogin();
  }
}
