import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Room } from 'src/models/room.model';
import { Router } from '@angular/router';
import { AlertService } from '../services/alert.service';
import { Alert } from 'src/models/alert.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './add-room.component.css']
})
export class HomeComponent implements OnInit {

  _userService: UserService = inject(UserService)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)

  rooms : Room[] = []
  newRoom : Room = new Room("", 0, [])
  showNewCard = false;

  ngOnInit(): void {
    this._userService.getRooms().subscribe({
      next: (res) => this.onSuccess(res),
    })
  }

  onSuccess(res: Room[]) {
    this.rooms = res;
  }

  onRoomClick(room: Room) {
    this._router.navigateByUrl(`/room/${room.name}`)
  }

  showAddRoom(form: Element) {
    if (!this.showNewCard) {
      form.classList.add("showing")
    } else {
      form.classList.remove("showing")
    }
    this.showNewCard = !this.showNewCard;
  }

  addRoom() {
    if (!this.newRoom.name) {
      this._alert.setAlert(new Alert("Room name can not be empty!", "red"))
      return
    }
    this._userService.addRoom(this.newRoom).subscribe({
      error: (err) => this._alert.setAlert(new Alert(err["message"], "red")),
      complete: () => location.reload()
    })
  }
}
