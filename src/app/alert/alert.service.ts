import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

import {AlertComponent} from './alert.component';
import {AlertModel} from './alert.model';
import {BehaviorSubject} from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class AlertService {

  private _alerts$ = new BehaviorSubject<AlertModel[]>([]);
  alerts$ = this._alerts$.asObservable();

  constructor() {
  }

  success(message: string, details?: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'success', message, details}]);
  }

  clearAll(): void {
    this._alerts$.next([]);
  }

  remove(alertModel: AlertModel): void {
    const currentAlerts = this._alerts$.getValue().slice();
    currentAlerts.splice(currentAlerts.findIndex(a => a === alertModel), 1);
    this._alerts$.next(currentAlerts);
  }

}
