import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-slide-toggle',
  templateUrl: './demo-slide-toggle.component.html',
  styleUrls: ['./demo-slide-toggle.component.scss']
})
export class DemoSlideToggleComponent {
  formControlSingle = new FormControl();

  enableSingle(): void {
    this.formControlSingle.enable();
  }

  disableSingle(): void {
    this.formControlSingle.disable();
  }

  errorSingle(): void {
    this.formControlSingle.setErrors({somekey: 'this is an error'});
  }

  get errorsSingle(): string[] {
    return this.formControlSingle.errors ? Object.values(this.formControlSingle.errors) : null;
  }
}
