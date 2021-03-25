import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { CheckboxComponent } from './checkbox.component';


@Injectable({
  providedIn: 'root'
})
export class CheckboxService {
  private components: CheckboxComponent[] = [];

  private _checkedValue$ = new BehaviorSubject<any>(null);
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
    this._checkedValue$.next(component.value);
  }

  markAsDisabled(disabledState: boolean): void {
    this._checkDisable$.next(disabledState);
  }

  markAsErrored(errorState: boolean): void {
    this._checkError$.next(errorState);
  }

  // This should probably just return values instead of full components.
  getCheckedComponents(): any[] {
    return this.components.filter(x => x.isChecked === true);
  }
}
