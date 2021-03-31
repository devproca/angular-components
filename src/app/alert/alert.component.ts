import {Component, Output, EventEmitter, Input} from '@angular/core';

@Component({
  selector: 'tw-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent {

  @Input() type: 'success' | 'info' | 'warning' | 'danger' = 'success';
  @Input() message: string;
  @Output() close = new EventEmitter<void>();

  constructor() { }

  onClose(): void {
    this.close.emit();
  }
}
