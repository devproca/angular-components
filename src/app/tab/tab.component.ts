import { Component, Input } from '@angular/core';


@Component({
  selector: 'tw-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent {
  @Input() label: string;
  @Input() isSelected = false;
}
