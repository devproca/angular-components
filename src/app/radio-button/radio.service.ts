import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { RadioButtonComponent } from './radio-button.component';


@Injectable()
export class RadioService {

  private components: RadioButtonComponent[] = [];

  private _checkedValue$ = new BehaviorSubject<string>(null);
  checkedValue$ = this._checkedValue$.asObservable();

  private _checkDisable$ = new BehaviorSubject<boolean>(null);
  checkDisable$ = this._checkDisable$.asObservable();

  private _checkError$ = new BehaviorSubject<boolean>(null);
  checkError$ = this._checkError$.asObservable();

  add(component: RadioButtonComponent): void {
    this.components.push(component);
  }

  remove(component: RadioButtonComponent): void {
    this.components.splice(this.components.findIndex(c => c === component), 1);
  }

  markChecked(component: RadioButtonComponent): void {
    this._checkedValue$.next(component.value);
  }

  markValueAsChecked(value: string): void {
    this._checkedValue$.next(value);
  }

  markAsDisabled(disabledState: boolean): void {
    this._checkDisable$.next(disabledState);
  }

  markAsErrored(errorState: boolean): void {
    this._checkError$.next(errorState);
  }
}
