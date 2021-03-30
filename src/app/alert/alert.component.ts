import { Component } from '@angular/core';

@Component({
  selector: 'tw-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  type: 'success' | 'info' | 'warning' | 'danger' = 'success';
  message: string;
}
