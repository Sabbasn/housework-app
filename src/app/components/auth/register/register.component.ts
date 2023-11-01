import { Component, inject } from '@angular/core';
import { UserRegister } from 'src/models/auth/userRegister.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../login/login.component.css', './register.component.css']
})
export class RegisterComponent {

  _auth: AuthService = inject(AuthService)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)

  user = new UserRegister()
  processPart = 0

  onSubmit() {
    if (this.processPart == 0 || this.processPart == 1) {
      this.processPart ++;
      return;
    }

    this._auth.register(this.user).subscribe({
      error: (err) => this._alert.alert(err["error"]["message"], AlertStatus.Error),
      complete: () =>  {
        this._alert.alert("Successfully created account!", AlertStatus.Success)
        this._router.navigate(["/login"])
      }
    })
  }

  passwordChecker(actual: string, confirm: string) {
    return (actual === confirm)
  }

  onBackClick() {
    if (this.processPart != 0) {
      this.processPart = this.processPart - 1
    }

  }
}
