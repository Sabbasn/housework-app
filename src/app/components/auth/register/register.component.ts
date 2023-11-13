import { Component, OnInit, inject } from '@angular/core';
import { UserRegister } from 'src/models/auth/userRegister.model';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AlertStatus } from 'src/models/util/alertStatus.enum';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
  }

  _auth: AuthService = inject(AuthService)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)
  _formBuilder: FormBuilder = inject(FormBuilder)

  passwordMatchValidator() {
    return (formGroup: FormGroup) => {
      const password = formGroup.controls['password']
      const confirmPassword = formGroup.controls['confirmPassword']

      if (password.value === confirmPassword.value) {
        confirmPassword.setErrors(null)
      } else {
        confirmPassword.setErrors({ passwordMismatch: true })
      }
    }
  }

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required]
  })

  secondFormGroup = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    phoneNumber: ['', [Validators.required, Validators.pattern('[0-9]*')]]
  })

  thirdFormGroup = this._formBuilder.group({
    password: ['', Validators.required],
    confirmPassword: ['', [Validators.required]]
  }, {
    validators: [this.passwordMatchValidator()]
  })

  user = new UserRegister()

  onSubmit() {
    if(!this.firstFormGroup.valid || !this.secondFormGroup.valid || !this.thirdFormGroup.valid) {
      return
    }
    this._auth.register(this.user).subscribe({
      error: (err) => this._alert.alert(err["error"]["message"], AlertStatus.Error),
      complete: () =>  {
        this._alert.alert("Successfully created account!", AlertStatus.Success)
        this._router.navigate(["/login"])
      }
    })
  }
}
