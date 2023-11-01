import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Room } from 'src/models/housework/room.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/models/util/alert.model';
import { Status } from 'src/models/housework/status.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './add-room.component.css'],
})
export class HomeComponent implements OnInit {

  _userService: UserService = inject(UserService)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)

  rooms : Room[] = []
  newRoom : Room = new Room()
  showRoomForm = false;

  roomStatusColor(status: Status) {
    switch (status) {
      case Status.Active:
        return '#036ffc'
      case Status.Finished:
        return 'var(--main-color)'
      case Status.Locked:
        return 'var(--locked-color)'
      case Status.Preparing:
        return '#e3801e'
    }
  }

  drop(event: CdkDragDrop<Room[]>) {
    var elemToMove = this.rooms[event.previousIndex]
    this.rooms[event.previousIndex] = this.rooms[event.currentIndex]
    this.rooms[event.currentIndex] = elemToMove

    for (let i = 0; i < this.rooms.length; i++) {
      const r = this.rooms[i];
      r.orderPriority = i
      this._userService.updateRoom(r).subscribe({
        complete: () => console.log(r.orderPriority)
      })
    }
  }

  ngOnInit(): void {
    this.updateRooms()
  }

  updateRooms() {
    this._userService.getRooms().subscribe({
      next: (res) => {
        this.rooms = res.sort((a, b) => {
          return a.orderPriority - b.orderPriority
        })
        this.newRoom = new Room()
      },
      error: (err) => this._alert.setAlert(new Alert(err["error"]["message"], AlertStatus.Error))
    })
  }

  onRoomClick(room: Room) {
    this._router.navigateByUrl(`/room/${room.name}`, { state: room })
  }

  showAddRoom() {
    this.showRoomForm = !this.showRoomForm;
  }

  addRoom() {
    if (!this.newRoom.name) {
      this._alert.setAlert(new Alert("Room name can not be empty!", AlertStatus.Warning))
      return
    }

    this._userService.addRoom(this.newRoom).subscribe({
      error: (err) => this._alert.setAlert(new Alert(err["message"], AlertStatus.Error)),
      complete: () => this.updateRooms()
    })
  }
}
