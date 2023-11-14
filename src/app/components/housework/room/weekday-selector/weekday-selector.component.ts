import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleGroup, MatButtonToggleModule } from '@angular/material/button-toggle';
import { Chore } from 'src/models/housework/chore.model';
import { WeekdaysPipe } from "../../../../pipes/weekdays.pipe";
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-weekday-selector',
    standalone: true,
    templateUrl: './weekday-selector.component.html',
    styleUrl: './weekday-selector.component.css',
    imports: [
        CommonModule,
        MatButtonModule,
        MatButtonToggleModule,
        WeekdaysPipe,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
    ]
})
export class WeekdaySelectorComponent implements AfterViewInit {
  @Input() chore!: Chore
  @Output() choreChange = new EventEmitter<string[]>()
  @ViewChild("group") selectedWeekDays! : MatButtonToggleGroup

  _cdr: ChangeDetectorRef = inject(ChangeDetectorRef)

  updateChore() {
    this.choreChange.emit(this.selectedWeekDays.value)
  }

  ngAfterViewInit(): void {
      this.selectedWeekDays.value = this.chore.repeatWeekdays
      this._cdr.detectChanges()
  }


}
