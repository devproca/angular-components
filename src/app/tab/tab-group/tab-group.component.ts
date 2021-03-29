import { Component, AfterContentInit, ContentChildren, QueryList } from '@angular/core';

import { TabComponent } from '../tab.component';


@Component({
  selector: 'tw-tab-group',
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss']
})
export class TabGroupComponent implements AfterContentInit {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit(): void {
    const selectedTab = this.tabs.filter((tab) => tab.isSelected);

    if (selectedTab.length === 0) {
      this.selectTab(this.tabs.first);
    }
  }

  selectTab(tab: TabComponent): void {
    this.tabs.toArray().forEach(t => t.isSelected = false); // Deselect all.
    tab.isSelected = true;
  }
}
