import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';


@Injectable()
export class AlertService {

  private subject = new ReplaySubject<any>();

  constructor() { }

  sendAlert(alert: boolean) {
    this.subject.next({ alert: alert });
  }

  clearAlert() {
    this.subject.next({alert: false});
  }

  getAlert(): Observable<any> {
    return this.subject.asObservable();
  }
}
