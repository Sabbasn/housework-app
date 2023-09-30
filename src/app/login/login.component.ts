import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserLogin } from 'src/models/userLogin.model';
import { Router } from '@angular/router';

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
  errorText = "";
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }
  
  ngOnInit(): void {
    this.token = localStorage.getItem('token')
    const isValid : boolean = this._auth.isTokenValid(this.token)
    if (isValid) {
      this._router.navigateByUrl('').then(() => window.location.reload())
    }
    
  }

  login() {
    this._auth.login(this.user).subscribe({
      next: (res) => this.onSuccess(res),
      error: (err) => this.errorText = err["error"]["message"],
      complete: () => console.log("Http Request Complete.")
    })
  }

  onSuccess(res: any) {
    localStorage.setItem("token", res["data"])
    localStorage.setItem("email", this.user.email)
    this._router.navigate(["/profile"])
  }
}
