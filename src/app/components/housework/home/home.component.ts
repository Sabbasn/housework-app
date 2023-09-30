import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Room } from 'src/models/housework/room.model';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/models/util/alert.model';
import { Status } from 'src/models/housework/status.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

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
  newRoom : Room = new Room("", 0, [])
  showNewCard = false;

  drop(event: CdkDragDrop<Room[]>) {
    var elemToMove = this.rooms[event.previousIndex]
    this.rooms[event.previousIndex] = this.rooms[event.currentIndex]
    this.rooms[event.currentIndex] = elemToMove
  }

  ngOnInit(): void {
    this._userService.getRooms().subscribe({
      next: (res) => this.onSuccess(res),
      error: (err) => this._alert.setAlert(new Alert("Could not get rooms.", Status.Locked))
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
      this._alert.setAlert(new Alert("Room name can not be empty!", Status.Locked))
      return
    }
    this._userService.addRoom(this.newRoom).subscribe({
      error: (err) => this._alert.setAlert(new Alert(err["message"], Status.Locked)),
      complete: () => location.reload()
    })
  }
}
