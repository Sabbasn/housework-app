import { Component, OnInit, inject } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Chore } from 'src/models/housework/chore.model';
import { AddChore } from 'src/models/housework/addChore.model';
import { Status } from 'src/models/housework/status.enum';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Alert } from 'src/models/util/alert.model';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', './add-chore.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string = ""
  choresActive: Chore[] = []
  choresFinished: Chore[] = []
  showNewCard: boolean = true
  newChore = new AddChore()

  _userService: UserService = inject(UserService)
  _route: ActivatedRoute = inject(ActivatedRoute)
  _alert: AlertService = inject(AlertService)
  
  ngOnInit(): void {
    this.roomName = this._route.snapshot.paramMap.get('name')?.toString()!
    this._userService.getChores(this.roomName).subscribe({
      next: (res) => this.onSuccess(res)
    })
  }

  drop(event: CdkDragDrop<Chore[]>, finishedList?: any) {
    if(event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
      if (event.container === finishedList) {
        var chore = event.container.data[event.currentIndex]
        chore.status = Status.Finished
        this._userService.updateChore(chore).subscribe({
          next: (res) => console.log(res["data"]),
          error: (err) => console.error(err),
          complete: () => console.log("Chore updated!")
        })
      }
    }
  }

  onSuccess(res: Chore[]) {
    res.forEach(chore => {
      if(chore.status === Status.Active || chore.status === Status.Locked) {
        this.choresActive.push(chore)
      } else {
        this.choresFinished.push(chore)
      }
    })
    this.choresActive.sort((a, b) => {
      return a.status - b.status
    })
  }

  onDoneClick(id: number) {
    this._userService.removeChore(id).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err),
      complete: () => console.log("Successfully removed chore!")
    })
    location.reload()
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
    this._userService.addChore(this.roomName, this.newChore).subscribe({
      next: (res) => console.log(res),
      error: (err) => console.warn(err),
      complete: () => { 
        console.log("Successfully added chore!")
        location.reload()
      }
    })
  }
}
