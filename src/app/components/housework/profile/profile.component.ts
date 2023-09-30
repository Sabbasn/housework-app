import { Component, OnInit } from '@angular/core';
import { User } from 'src/models/auth/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  constructor(private _userService: UserService) {}
  user = new User()
  email = localStorage.getItem("email")

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
  }
}
