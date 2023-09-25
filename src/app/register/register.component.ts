import { Component } from '@angular/core';
import { UserRegister } from 'src/models/userRegister.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent {

  constructor(private _auth: AuthService) {}

  model = new UserRegister()

  onSubmit() {
    console.log(this.model.password)
    this._auth.register(this.model).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.log(err),
      complete: () => console.log("Http Request Complete.")
    })
  }
}
