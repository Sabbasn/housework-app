import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Room } from 'src/models/housework/room.model';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.css']
})
export class ImageUploaderComponent {
  @Input() room!: Room
  @Input() url!: string | ArrayBuffer | null | undefined
  @Output() urlChange = new EventEmitter<string | ArrayBuffer | null>()

  FILE_MAX_SIZE = 500_000
  _fileReader: FileReader = new FileReader()
  _userService: UserService = inject(UserService)
  _alertService: AlertService = inject(AlertService)

  uploadFile(event: Event) {
    var target = event.target as HTMLInputElement
    if (!target.files || !target.files[0]) {
      return
    }
    if (target.files[0].size >= this.FILE_MAX_SIZE) {
      this._alertService.alert(
        `File size is too large, file can not be larger than ${this.FILE_MAX_SIZE / 1000}KB`,
        AlertStatus.Error)
      return
    }
    this._fileReader.readAsDataURL(target.files[0])
    this._fileReader.onload = () => {
      this.url = this._fileReader.result
      this.room.image = this.url
      this.urlChange.emit(this.url)
      this._userService.updateRoom(this.room).subscribe()
    }
  }
}
