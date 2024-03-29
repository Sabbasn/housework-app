import { Component, Inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-confirm-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './confirm-delete-dialog.component.html',
  styleUrl: './confirm-delete-dialog.component.css'
})
export class ConfirmDeleteDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {delete: boolean, roomName: string}) { }
}
