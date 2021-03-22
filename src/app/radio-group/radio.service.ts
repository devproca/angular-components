import {Injectable} from '@angular/core';
import {RadioButtonComponent} from '../radio-button/radio-button.component';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class RadioService {

  private components: RadioButtonComponent[] = [];

  private _checkedValue$ = new BehaviorSubject<string>(null);
  checkedValue$ = this._checkedValue$.asObservable();

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
}
