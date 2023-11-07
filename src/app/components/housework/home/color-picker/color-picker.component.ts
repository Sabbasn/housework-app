import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.css']
})
export class ColorPickerComponent {
  @Input() roomColor!: string
  @Output() roomColorChange = new EventEmitter<string>()

  updateColor() {
    this.roomColorChange.emit(this.roomColor)
  }
}
