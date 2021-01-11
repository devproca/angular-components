import {Component, OnInit} from '@angular/core';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'tw-dialog-header',
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent {

  constructor(private dialogComponent: DialogComponent) {
  }

  onClose(): void {
    this.dialogComponent.close();
  }
}
