import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, TemplateRef, ViewChild} from '@angular/core';
import {PopperComponent} from '../popper/popper.component';

@Component({
  selector: 'tw-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.scss']
})
export class OverflowMenuComponent implements OnDestroy, AfterViewInit {

  @Input() options: OverflowMenuModel[];

  @Input() template: TemplateRef<any>;

  @ViewChild(PopperComponent) popper: PopperComponent;

  constructor(private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
  }

  ngAfterViewInit(): void {
    this.changeDetectorRef.detectChanges();
  }
}


export class OverflowMenuModel {
  label: string;
  click: () => void;
}
