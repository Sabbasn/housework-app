import { Component, Injectable, OnInit, inject } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/models/util/alert.model';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

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

  colorPicker(status: AlertStatus) {
    switch (status) {
      case AlertStatus.Success:
        return 'var(--main-color)'
      case AlertStatus.Warning:
        return '#db7e37'
      case AlertStatus.Error:
        return '#e34240'
    }
  }

  private delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  
  async updateAlert() {
    this.statusText = this.alert.text
    this.color = this.colorPicker(this.alert.backgroundColor)
    this.classes.push('show')
    await this.delay(5000)
    this.hide()
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
