import { Component, Input, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { Room } from 'src/models/housework/room.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() room!: Room;

  _userService: UserService = inject(UserService)
  _router: Router = inject(Router)

  changeRoomColor(room: Room) {
    this._userService.updateRoom(room).subscribe()
  }

  onRoomClick(room: Room) {
    this._router.navigateByUrl(`/room/${room.name}`, { state: room })
  }

  dragStartDelay() {
    if (navigator.maxTouchPoints > 0) {
      return 200
    } else {
      return 0
    }
  }
}
