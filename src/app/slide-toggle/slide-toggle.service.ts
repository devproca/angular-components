import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

import { SlideToggleComponent } from './slide-toggle.component';

@Injectable()
export class SlideToggleService {
  private components: SlideToggleComponent[] = [];

  private _toggledValue$ = new BehaviorSubject<string[]>([]);
  toggledValue$ = this._toggledValue$.asObservable();

  private _checkDisabled$ = new BehaviorSubject<boolean>(null);
  checkDisable$ = this._checkDisabled$.asObservable();

  private _checkError$ = new BehaviorSubject<boolean>(null);
  checkError$ = this._checkError$.asObservable();

  add(component: SlideToggleComponent): void {
    this.components.push(component);
  }

  remove(component: SlideToggleComponent): void {
    this.components.splice(this.components.findIndex(c => c === component), 1);
  }

  markToggled(component: SlideToggleComponent): void {
    const currentToggledValues = this._toggledValue$.getValue();
    this._toggledValue$.next([...currentToggledValues, component.value]);
  }

  markUntoggled(component: SlideToggleComponent): void {
    const currentToggledValues = [...this._toggledValue$.getValue()];
    currentToggledValues.splice(currentToggledValues.findIndex(v => v === component.value), 1);
    this._toggledValue$.next(currentToggledValues);
  }

  markAsDisabled(disabledState: boolean): void {
    this._checkDisabled$.next(disabledState);
  }

  markAsErrored(errorState: boolean): void {
    this._checkError$.next(errorState);
  }

  setToggledValues(values: string[]): void {
    if (!values) {
      this._toggledValue$.next([]);
    } else {
      this._toggledValue$.next(values);
    }
  }
}
