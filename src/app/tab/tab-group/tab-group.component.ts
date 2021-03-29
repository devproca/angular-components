import {AfterContentInit, Component, QueryList, ContentChildren} from '@angular/core';

import { TabService } from '../tab.service';
import {TabComponent} from '../tab.component';


@Component({
  selector: 'tw-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  constructor(private tabService: TabService) {
  }

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.filter((tab) => tab.isSelected);

    console.log('TABS LOG', this.tabs);

    if (selectedTab.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent): void {
    //this.tabs.toArray().forEach(tab => tab.isSelected = false);

    this.tabService.markAllDeselected();

    console.log('AFTER DS', this.tabs);

    this.tabService.markTabAsSelected(true);
  }
}
