import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'tw-chip',
  templateUrl: './chip.component.html',
  styleUrls: ['./chip.component.scss']
})
export class ChipComponent {

  @Input() label: string;

  @Output() close = new EventEmitter<void>();

  onClose(): void {
    this.close.emit();
  }
}
