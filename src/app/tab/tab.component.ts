import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';

import { TabService } from './tab.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tw-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {
  private subscriptions: Subscription[] = [];

  @Input() label: string;
  @Input() isSelected = false;
  @Output() selected = new EventEmitter<void>();

  constructor(private tabService: TabService) { }

  ngOnInit(): void {
    this.tabService.add(this);
    this.registerSelectedChanges();
  }

  ngOnDestroy(): void {
    this.tabService.remove(this);
    this.subscriptions.forEach(s => s.unsubscribe());
  }



  onSelected(): void {
    console.log('CHECKED');
    this.tabService.markSelected(this);
    this.selected.emit();
  }

  private registerSelectedChanges(): void {
    this.subscriptions.push(
      this.tabService.selectedTab$.subscribe(selectedTab => {
        this.isSelected = selectedTab === true;
      }));
  }

}
