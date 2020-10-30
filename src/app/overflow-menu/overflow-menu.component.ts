import {Component, Input, TemplateRef} from '@angular/core';

@Component({
  selector: 'tw-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.scss']
})
export class OverflowMenuComponent {

  @Input() options: OverflowMenuModel[];

  @Input() template: TemplateRef<any>;


}


export class OverflowMenuModel {
  label: string;
  click: () => void;
}
