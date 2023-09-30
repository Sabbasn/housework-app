import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Chore } from 'src/models/chore.model';
import { AddChore } from 'src/models/addChore.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css', './add-chore.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string = ""
  chores: Chore[] = []
  showNewCard: boolean = true
  newChore = new AddChore()

  _userService: UserService = inject(UserService)
  _route: ActivatedRoute = inject(ActivatedRoute)
  
  ngOnInit(): void {
    this.roomName = this._route.snapshot.paramMap.get('name')?.toString()!
    this._userService.getChores(this.roomName).subscribe({
      next: (res) => this.onSuccess(res)
    })
  }

  onSuccess(res: Chore[]) {
    this.chores = res;
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
