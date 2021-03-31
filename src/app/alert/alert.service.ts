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

  success(message: string): void {
    this._alerts$.next([...this._alerts$.getValue(), {type: 'success', message}]);
  }

  clearAll(): void {
    this._alerts$.next([]);
  }
}
