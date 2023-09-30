import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AlertService } from '../services/alert.service';
import { Alert } from 'src/models/alert.model';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})

@Injectable()
export class AlertComponent implements OnInit {
  statusText = 'Test'
  classes : Array<string> = ['container']
  color = "var(--main-color)"
  alert: Alert = new Alert()
  _alertService : AlertService = inject(AlertService)
  
  public updateAlert() {
    this.statusText = this.alert.text
    this.color = this.alert.backgroundColor
    this.classes.push('show')
  }

  hide() {
    var itemIndex = this.classes.indexOf('show')
    this.classes = this.classes.filter((_, i) => i !== itemIndex)
  }

  ngOnInit(): void {
    this._alertService.getAlert().subscribe((alert) => {
      this.alert = alert
      this.updateAlert()
    })
  }
}
