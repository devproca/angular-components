import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-checkbox',
  templateUrl: './demo-checkbox.component.html',
  styleUrls: ['./demo-checkbox.component.scss']
})
export class DemoCheckboxComponent {

  formControlGroup = new FormControl();
  formControlSingle = new FormControl();

  enableGroup(): void {
    this.formControlGroup.enable();
  }

  enableSingle(): void {
    this.formControlSingle.enable();
  }

  disableGroup(): void {
    this.formControlGroup.disable();
  }

  disableSingle(): void {
    this.formControlSingle.disable();
  }

  errorGroup(): void {
    this.formControlGroup.setErrors({somekey: 'this is an error'});
  }

  errorSingle(): void {
    this.formControlSingle.setErrors({somekey: 'You must accept the terms of use to continue.'});
  }

  get errorsGroup(): string[] {
    return this.formControlGroup.errors ? Object.values(this.formControlGroup.errors) : null;
  }

  get errorsSingle(): string[] {
    return this.formControlSingle.errors ? Object.values(this.formControlSingle.errors) : null;
  }
}
