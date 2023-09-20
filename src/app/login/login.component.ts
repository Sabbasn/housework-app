import { Component, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {

  token: any;
  constructor(private authService: AuthService) { }

  login() {
    this.authService.login("test", "test").subscribe((data) => {
      this.authService.bearerToken = data["data"]
    })
  }
}
