import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { AlertModel } from './alert.model';


@Injectable({
  providedIn: 'root',
})
export class AlertService {
  private _alerts$ = new BehaviorSubject<AlertModel[]>([]);
  alerts$ = this._alerts$.asObservable();

  constructor() { }

  success(message: string, details?: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'success', message, details}]);
  }

  info(message: string, details?: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'info', message, details}]);
  }

  warning(message: string, details?: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'warning', message, details}]);
  }

  danger(message: string, details?: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'danger', message, details}]);
  }

  remove(alertModel: AlertModel): void {
    const currentAlerts = this._alerts$.getValue().slice();
    currentAlerts.splice(currentAlerts.findIndex(a => a === alertModel), 1);
    this._alerts$.next(currentAlerts);
  }

  clearAll(): void {
    this._alerts$.next([]);
  }
}
