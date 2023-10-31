import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chore } from 'src/models/housework/chore.model';
import { AddChore } from 'src/models/housework/addChore.model';
import { Status } from 'src/models/housework/status.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Alert } from 'src/models/util/alert.model';
import { AlertService } from 'src/app/services/alert.service';
import { AlertStatus } from 'src/models/util/alertStatus.enum';
import { Room } from 'src/models/housework/room.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', './add-chore.component.css']
})
export class RoomComponent implements OnInit {
  currentRoom : Room = new Room()
  chores: Chore[] = []
  showNewCard: boolean = true
  newChore = new AddChore()

  _userService: UserService = inject(UserService)
  _route: ActivatedRoute = inject(ActivatedRoute)
  _alert: AlertService = inject(AlertService)
  
  ngOnInit(): void {
    this.currentRoom = history.state
    this.updateChores()
  }

  updateChores() {
    this.chores = []
    this._userService.getChores(this.currentRoom.name).subscribe({
      next: (res) => {
        res.forEach(chore => {
          if(chore.status === Status.Active || chore.status === Status.Locked) {
            this.chores.push(chore)
          }
        })
        
        this.chores.sort((a, b) => {
          return a.status - b.status
        })
      }
    })
  }

  onReadyClick() {
    if (this.chores.length == 0) {
      this._alert.setAlert(new Alert('You must add atleast one chore in order to ready up!', AlertStatus.Error))
      return
    }
    this.currentRoom.status = Status.Active
    this._userService.updateRoom(this.currentRoom).subscribe({
      error: () => this._alert.setAlert(new Alert('Could not ready up. Please try again.', AlertStatus.Error)),
      complete: () => console.log("Successfully changed status of room!")
    })
  }

  onDoneClick(chore: Chore, choreElem: HTMLElement) {
    choreElem.classList.add("hidden")
    choreElem.classList.remove("active")
    chore.status = Status.Finished
    this._userService.updateChore(chore).subscribe({
      error: () => this._alert.setAlert(new Alert("Couldn't complete chore, please try again..", AlertStatus.Warning)),
      complete: () => this._alert.setAlert(new Alert(`Congratulations, You got ${chore.experienceReward}xp!`, AlertStatus.Success))
    })
  }

  showAddChore(form: Element) {
    if (this.showNewCard) {
      form.classList.add("showing")
    } else {
      form.classList.remove("showing")
    }
    this.showNewCard = !this.showNewCard;
  }

  addChore() {
    if (!this.newChore.name) {
      this._alert.setAlert(new Alert("The chore must have a name!", AlertStatus.Warning))
      return
    }
    this._userService.addChore(this.currentRoom.name, this.newChore).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err),
      complete: () => {
        this.newChore = new AddChore()
        console.log("Successfully added chore!")
        this.updateChores()
      }
    })
  }
}
