import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserLogin } from 'src/models/userLogin.model';
import { Router } from '@angular/router';
import { Alert } from 'src/models/alert.model';
import { AlertService } from '../services/alert.service';
import { Status } from 'src/models/status.enum';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  token: any;
  user = new UserLogin()
  isLoggingIn = false
  errorText = "";
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  _alert : AlertService = inject(AlertService)

  showAlert(alert: Alert) {
    this._alert.setAlert(alert)
  }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    const isValid : boolean = this._auth.isTokenValid(this.token)
    if (isValid) {
      this._router.navigateByUrl('').then(() => window.location.reload())
    }
  }

  login() {
    this.isLoggingIn = true
    this._auth.login(this.user).subscribe({
      next: (res) => this.onSuccess(res),
      error: (err) => { 
        this.errorText = err["error"]["message"]
        const alert = new Alert(this.errorText, Status.Locked)
        this.showAlert(alert)
        this.isLoggingIn = false
      },
      complete: () => this.isLoggingIn = false
    })
  }

  onSuccess(res: any) {
    localStorage.setItem("token", res["data"])
    localStorage.setItem("email", this.user.email)
    this._router.navigate(["/"]).then(() => location.reload())
  }
}
