import { Component, OnInit, inject } from '@angular/core';
import { User } from 'src/models/auth/user.model';
import { UserService } from 'src/app/services/user.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _userService: UserService) {}
  _cookie: CookieService = inject(CookieService)

  user = new User()
  email = this._cookie.get("email")

  ngOnInit(): void {
    this._userService.getUserData(this.email!).subscribe({
      next: (res) => this.mapUserData(res),
      error: (err) => console.log(err),
      complete: () => console.log("Successfully retrieved user data.")
    })
  }

  mapUserData(res: any) {
    this.user.email = res["data"]["email"]
    this.user.firstName = res["data"]["firstName"]
    this.user.lastName = res["data"]["lastName"]
    this.user.level = res["data"]["level"]
    this.user.experience = res["data"]["experience"]
  }

  calcExpToLevel() {
    return Math.ceil(200 * Math.log(this.user.level) + 100)
  }
}
