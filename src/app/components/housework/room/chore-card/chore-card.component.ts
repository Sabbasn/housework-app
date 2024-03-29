import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AudioService } from 'src/app/services/audio.service';
import { UserService } from 'src/app/services/user.service';
import { AudioCue } from 'src/models/housework/audioCue';
import { Chore } from 'src/models/housework/chore.model';
import { Status } from 'src/models/housework/status.enum';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Component({
  selector: 'app-chore-card',
  templateUrl: './chore-card.component.html',
  styleUrls: ['./chore-card.component.scss']
})
export class ChoreCardComponent implements OnInit {

  @Input() chore!: Chore
  @Input() chores!: Chore[]
  @Input() chorePriority!: Number
  @Input() roomStatus!: Number
  @Output() updateChoreEvent = new EventEmitter<Chore>()

  _userService: UserService = inject(UserService)
  _alert: AlertService = inject(AlertService)
  _audio: AudioService = inject(AudioService)

  choreClasses: string[] = []

  ngOnInit(): void {
    if (this.roomStatus == Status.Preparing) {
      this.choreClasses.push('preview')
    } else {
      this.choreClasses.push('active')
    }
  }

  onDoneClick() {
    this.chore.status = Status.Finished
    this._userService.updateChore(this.chore).subscribe({
      error: () => this._alert.alert("Couldn't complete chore, please try again..", AlertStatus.Warning),
      complete: () => {
        this._alert.alert(`You received ${this.chore.experienceReward} experience!`, AlertStatus.Success)
        this._audio.playAudio(AudioCue.CHORE_FINISH)
        this.updateChoreEvent.emit(this.chore)
      }
    })
  }

  updateChore(weekdays: string[], chore: Chore) {
    chore.repeatWeekdays = weekdays
    this._userService.updateChore(chore).subscribe({
      error: () => this._alert.alert("Could not update chore, please try again.", AlertStatus.Error)
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
  
  removeChore(chore: Chore) {
    this._userService.removeChore(chore.id).subscribe({
      error: () => this._alert.alert("Couldn't delete chore. Please try again.", AlertStatus.Error),
      complete: () => this.updateChoreEvent.emit(this.chore)
    })
  }
}
