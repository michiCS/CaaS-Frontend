import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/authentication.service';

@Component({
  selector: 'caas-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService) { }

  isLoggedIn: boolean;

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  login(): void {
    if(!this.authService.isLoggedIn()) {
      this.authService.login();
    }
  }
}
