import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-checkbox',
  templateUrl: './demo-checkbox.component.html',
  styleUrls: ['./demo-checkbox.component.scss']
})
export class DemoCheckboxComponent {
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
