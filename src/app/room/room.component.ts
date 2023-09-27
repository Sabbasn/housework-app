import { Component, OnInit, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Chore } from 'src/models/chore.model';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  roomName: string = ""
  chores: Chore[] = []

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

  onRemovePress() {
    
  }
  
}