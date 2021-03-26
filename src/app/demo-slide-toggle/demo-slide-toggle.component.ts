import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-slide-toggle',
  templateUrl: './demo-slide-toggle.component.html',
  styleUrls: ['./demo-slide-toggle.component.scss']
})
export class DemoSlideToggleComponent {
  formControlGroup = new FormControl();
  formControlSingle = new FormControl();

  enableSingle(): void {
    this.formControlSingle.enable();
  }

  enableGroup(): void {
    this.formControlGroup.enable();
  }

  disableSingle(): void {
    this.formControlSingle.disable();
  }

  disableGroup(): void {
    this.formControlGroup.disable();
  }

  errorSingle(): void {
    this.formControlSingle.setErrors({somekey: 'this is an error'});
  }

  errorGroup(): void {
    this.formControlGroup.setErrors({somekey: 'this is an error'});
  }

  get errorsSingle(): string[] {
    return this.formControlSingle.errors ? Object.values(this.formControlSingle.errors) : null;
  }

  get errorsGroup(): string[] {
    return this.formControlGroup.errors ? Object.values(this.formControlGroup.errors) : null;
  }
}
