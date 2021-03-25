import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { CheckboxComponent } from './checkbox.component';


@Injectable()
export class CheckboxService {
  private components: CheckboxComponent[] = [];

  private _checkedValue$ = new BehaviorSubject<string[]>([]);
  checkedValue$ = this._checkedValue$.asObservable();

  private _checkDisable$ = new BehaviorSubject<boolean>(null);
  checkDisable$ = this._checkDisable$.asObservable();

  private _checkError$ = new BehaviorSubject<boolean>(null);
  checkError$ = this._checkError$.asObservable();

  add(component: CheckboxComponent): void {
    this.components.push(component);
  }

  remove(component: CheckboxComponent): void {
    this.components.splice(this.components.findIndex(c => c === component), 1);
  }

  markChecked(component: CheckboxComponent): void {
    const currentCheckedValues = this._checkedValue$.getValue();
    this._checkedValue$.next([...currentCheckedValues, component.value]);
  }

  markUnchecked(component: CheckboxComponent): void {
    const currentCheckedValues = [...this._checkedValue$.getValue()];
    currentCheckedValues.splice(currentCheckedValues.findIndex(v => v === component.value), 1);
    this._checkedValue$.next(currentCheckedValues);
  }

  markAsDisabled(disabledState: boolean): void {
    this._checkDisable$.next(disabledState);
  }

  markAsErrored(errorState: boolean): void {
    this._checkError$.next(errorState);
  }

  setCheckedValues(values: string[]): void {
    if (!values) {
      this._checkedValue$.next([]);
    } else {
      this._checkedValue$.next(values);
    }
  }
}
