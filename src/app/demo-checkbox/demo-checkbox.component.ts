import {Component, OnInit} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tw-demo-checkbox',
  templateUrl: './demo-checkbox.component.html',
  styleUrls: ['./demo-checkbox.component.scss']
})
export class DemoCheckboxComponent implements OnInit {
  formControl = new FormControl(["ONE", "FOUR"]);

  options = [
    {
      label: "One",
      value: "ONE"
    },
    {
      label: "Two",
      value: "TWO"
    },
    {
      label: "Three",
      value: "THREE"
    }
  ];

  ngOnInit(): void {

  }

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
