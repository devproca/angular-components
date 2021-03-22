import { Component, Input } from '@angular/core';

@Component({
  selector: 'tw-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent {
  @Input() id: string;
  @Input() label: string;
  @Input() value: string;
  @Input() groupName: string;

  @Input() isChecked = false;
  @Input() disabled = false;
}
