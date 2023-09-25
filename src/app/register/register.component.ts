import { Component } from '@angular/core';
import { UserRegister } from 'src/models/userRegister.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent {

  constructor(
    private _auth: AuthService,
    private _route: Router
    ) {}

  user = new UserRegister()
  errorMessage = "";
  processPart = 0

  actualPass = ""
  confirmPass = ""
  passwordCorrect = false

  onSubmit() {
    if (this.processPart == 0 || this.processPart == 1) {
      this.processPart ++;
      return;
    }
    this._auth.register(this.user).subscribe({
      next: (res) => this.onRegistered(res),
      error: (err) => this.errorMessage = err["error"]["message"],
      complete: () => console.log("Http Request Complete.")
    })
  }

  passwordChecker(actual: string, confirm: string) {
    this.passwordCorrect = (actual === confirm)
  }

  onRegistered(res: any) {
    alert("Account created!")
    this._route.navigate(["/login"])
  }
}
