import {Component, Input, TemplateRef, ViewChild} from '@angular/core';
import {PopperComponent} from '../popper/popper.component';

@Component({
  selector: 'tw-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.scss']
})
export class OverflowMenuComponent {

  @Input() options: OverflowMenuModel[];

  @Input() template: TemplateRef<any>;

  @ViewChild(PopperComponent) popper: PopperComponent;

}


export class OverflowMenuModel {
  label: string;
  click: () => void;
}
