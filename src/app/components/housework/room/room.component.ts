import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Chore } from 'src/models/housework/chore.model';
import { AddChore } from 'src/models/housework/addChore.model';
import { Status } from 'src/models/housework/status.enum';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AlertService } from 'src/app/services/alert.service';
import { AlertStatus } from 'src/models/util/alertStatus.enum';
import { Room } from 'src/models/housework/room.model';
import { AudioService } from 'src/app/services/audio.service';
import { AudioCue } from 'src/models/housework/audioCue';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', './add-chore.component.css', './room-menu.component.css']
})
export class RoomComponent implements OnInit {
  currentRoom : Room = new Room()
  chores: Chore[] = []
  showChoreForm: boolean = false
  hamburgerToggle: boolean = false

  _userService: UserService = inject(UserService)
  _route: ActivatedRoute = inject(ActivatedRoute)
  _router: Router = inject(Router)
  _alert: AlertService = inject(AlertService)
  _audio: AudioService = inject(AudioService)
  
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
          return a.orderPriority - b.orderPriority
        })

        if (this.currentRoom.status == Status.Active) {
          this.chores.reverse()
        }
      }
    })
  }

  prepareChores() {
    this.currentRoom.status = Status.Preparing
    this._userService.updateRoom(this.currentRoom).subscribe({
      error: () => this._alert.alert('Could not start. Please try again.', AlertStatus.Error),
      complete: () => console.log("Successfully changed status of room!")
    })
  }

  executeChores() {
    if (this.chores.length == 0) {
      this._alert.alert("You must add atleast one chore in order to start!", AlertStatus.Warning)
      return
    }
    this.currentRoom.status = Status.Active
    this._userService.updateRoom(this.currentRoom).subscribe({
      error: () => this._alert.alert('Could not start your cleaning journey. Please try again.', AlertStatus.Error),
      complete: () => this.chores.reverse()
    })
  }

  onDoneClick(chore: Chore) {
    var indexToRemove = this.chores.indexOf(chore)
    this.chores.splice(indexToRemove, 1)
    chore.status = Status.Finished
    this._userService.updateChore(chore).subscribe({
      error: () => this._alert.alert("Couldn't complete chore, please try again..", AlertStatus.Warning),
      complete: () => {
        this._alert.alert(`Congratulations, You got ${chore.experienceReward}xp!`, AlertStatus.Success)
        this.updateChores()
        this._audio.playAudio(AudioCue.CHORE_FINISH)
      }
    })
    if (this.chores.length == 0) {
      this.currentRoom.status = Status.Finished
      this._userService.updateRoom(this.currentRoom).subscribe()
    }
  }

  addChore() {
    var choreName = `Chore ${this.chores.length + 1}`
    var choreDesc = ''
    var chore = new AddChore(
      choreName,
      choreDesc,
      Status.Active
    )
    this._userService.addChore(this.currentRoom.name, chore).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err),
      complete: () => {
        console.log("Successfully added chore!")
        this.updateChores()
      }
    })
  }

  removeChore(chore: Chore) {
    this._userService.removeChore(chore.id).subscribe({
      error: () => this._alert.alert("Couldn't delete chore. Please try again.", AlertStatus.Error),
      complete: () => this.updateChores()
    })
  }

  renameChore(chore: Chore, name: string, desc: string) {
    if(chore.name == name && chore.description == desc) {
      return
    }
    chore.name = name
    chore.description = desc
    this._userService.updateChore(chore).subscribe({
      error: () => this._alert.alert("An error occured renaming your chore.", AlertStatus.Error),
    })
  }

  renameRoom(title: HTMLInputElement) {
    if (this.currentRoom.name == title.value) {
      return
    }
    this.currentRoom.name = title.value
    this._userService.updateRoom(this.currentRoom).subscribe({
      error: () => this._alert.alert("Could not rename the room, please try again.", AlertStatus.Error),
      complete: () => this._alert.alert("Successfully renamed the room!", AlertStatus.Success)
    })
  }

  choreDrop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.chores, event.previousIndex, event.currentIndex)
    for (let i = 0; i < this.chores.length; i++) {
      const c = this.chores[i];
      c.orderPriority = i
      this._userService.updateChore(c).subscribe()
    }
  }

  toggleMenu() {
    this.hamburgerToggle = !this.hamburgerToggle
  }

  deleteRoom() {
    this._userService.deleteRoom(this.currentRoom.id).subscribe({
      error: () => this._alert.alert("An error occured trying to delete room. Please try again.", AlertStatus.Error),
      complete: () => this._router.navigateByUrl("/")
    })
  }
}
