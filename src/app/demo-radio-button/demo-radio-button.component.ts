import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-radio-button',
  templateUrl: './demo-radio-button.component.html',
  styleUrls: ['./demo-radio-button.component.scss']
})
export class DemoRadioButtonComponent {
  formControl = new FormControl('ONE');

  enable(): void {
    this.formControl.enable();
  }

  disable(): void {
    this.formControl.disable();
  }

  error(): void {
    this.formControl.setErrors({somekey: 'this is an error'});
  }

  get errors(): string[] {
    return this.formControl.errors ? Object.values(this.formControl.errors) : null;
  }
}
