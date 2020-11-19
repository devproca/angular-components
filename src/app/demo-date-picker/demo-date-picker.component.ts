import {Component} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'tw-demo-date-picker',
  templateUrl: './demo-date-picker.component.html',
  styleUrls: ['./demo-date-picker.component.scss']
})
export class DemoDatePickerComponent {
  formControl = new FormControl('2016-03-03');

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
