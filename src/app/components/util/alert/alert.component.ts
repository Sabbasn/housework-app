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
  alerts: Alert[] = []
  duration = 5000
  isShowing = false
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

  hide(alert: Alert) {
    var idx = this.alerts.indexOf(alert);
    this.alerts.splice(idx, 1)
  }

  async updateAlert(alert: Alert) {
    await this.delay(this.duration)
    alert.opacity = 0
    await this.delay(1000)
    this.alerts.pop()
  }

  ngOnInit(): void {
    this._alertService.getAlert().subscribe((alert) => {
      this.alerts.unshift(alert)
      this.updateAlert(alert)
    })
  }
}
