import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'tw-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {
  @Output() close = new EventEmitter<void>();

  type: 'success' | 'info' | 'warning' | 'danger' = 'success';
  message: string;

  constructor() { }

  onClose(): void {
    this.close.emit();
  }
}
