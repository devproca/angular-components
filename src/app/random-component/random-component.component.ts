import {Component, OnInit} from '@angular/core';
import {DialogConfig} from '../dialog/dialog-config.model';
import {DialogComponent} from '../dialog/dialog.component';

@Component({
  selector: 'tw-random-component',
  templateUrl: './random-component.component.html',
  styleUrls: ['./random-component.component.scss']
})
export class RandomComponentComponent implements OnInit {

  userId: string;

  constructor(private dialogConfig: DialogConfig,
              private dialogComponent: DialogComponent) {
  }

  ngOnInit(): void {
    this.userId = this.dialogConfig.data.userId;
  }

  closeDialog(): void {
    this.dialogComponent.close('SAVED');
  }
}
