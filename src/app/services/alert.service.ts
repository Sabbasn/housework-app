import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Alert } from 'src/models/alert.model';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alert$ = new Subject<Alert>

  setAlert(alert: Alert): void {
    this.alert$.next(alert)
  }

  getAlert(): Observable<Alert> {
    return this.alert$.asObservable()
  }
}
