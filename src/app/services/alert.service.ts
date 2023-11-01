import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/models/util/alert.model';
import { AlertStatus } from 'src/models/util/alertStatus.enum';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert$ = new Subject<Alert>

  /**
   * @deprecated This function will soon be removed; use alert() instead.
   * @param alert An alert object to be displayed to the user 
   */
  setAlert(alert: Alert): void {
    this.alert$.next(alert)
  }

  /**
   * Displays an alert for the user.
   * @param text The text to be displayed
   * @param statusColor The color to be displayed
   */
  alert(text: string, statusColor: AlertStatus) {
    this.alert$.next(new Alert(text, statusColor))
  }

  getAlert(): Observable<Alert> {
    return this.alert$.asObservable()
  }
}
