import { Injectable } from '@angular/core';
import {TabComponent} from './tab.component';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private components: TabComponent[] = [];

  private _selectedTab$ = new BehaviorSubject<boolean>(null);
  selectedTab$ = this._selectedTab$.asObservable();

  add(component: TabComponent): void {
    this.components.push(component);
  }

  remove(component: TabComponent): void {
    this.components.splice(this.components.findIndex(c => c === component), 1);
  }

  markSelected(component: TabComponent): void {
    this._selectedTab$.next(component.isSelected);
  }

  markTabAsSelected(selectedState: boolean): void {
    //this.components[0].isSelected = selectedState;
    this._selectedTab$.next(selectedState);
  }

  markAllDeselected(): void {
    for (let c of this.components) {
      c.isSelected = false;
    }
  }

}
