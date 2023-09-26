import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Room } from 'src/models/room.model';
import { Service } from 'src/models/service.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  _userService: UserService = inject(UserService)

  rooms : Room[] = []

  ngOnInit(): void {
    this._userService.getRooms().subscribe({
      next: (res) => this.onSuccess(res),
    })
  }

  onSuccess(res: Room[]) {
    this.rooms = res;
  }
}
