import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Room } from 'src/models/housework/room.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/models/util/alert.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', './add-room.component.css'],
})
export class HomeComponent implements OnInit {

  isLoading : boolean = false

  _userService: UserService = inject(UserService)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)

  rooms : Room[] = []
  newRoom : Room = new Room()
  showRoomForm = false;

  ngOnInit(): void {
    this.updateRooms()
  }



  drop(event: CdkDragDrop<Room[]>) {
    moveItemInArray(this.rooms, event.previousIndex, event.currentIndex)

    for (let i = 0; i < this.rooms.length; i++) {
      const r = this.rooms[i];
      r.orderPriority = i
      this._userService.updateRoom(r).subscribe({
        complete: () => console.log(r.orderPriority)
      })
    }
  }

  updateRooms() {
    this.isLoading = true
    this._userService.getRooms().subscribe({
      next: (res) => {
        this.rooms = res.sort((a, b) => {
          return a.orderPriority - b.orderPriority
        })
        this.newRoom = new Room()
      },
      error: (err) => {
        this._alert.alert(err["error"]["message"], AlertStatus.Error)
        this.isLoading = false
      },
      complete: () => this.isLoading = false
    })
  }

  showAddRoom() {
    this.showRoomForm = !this.showRoomForm;
  }

  addRoom() {
    if (!this.newRoom.name) {
      this._alert.alert("Room name can not be empty!", AlertStatus.Warning)
      return
    }

    this._userService.addRoom(this.newRoom).subscribe({
      error: (err) => this._alert.setAlert(new Alert(err["message"], AlertStatus.Error)),
      complete: () => this.updateRooms()
    })
  }
}
