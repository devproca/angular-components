import { Component } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'tw-demo-radio-button',
  templateUrl: './demo-radio-button.component.html',
  styleUrls: ['./demo-radio-button.component.scss']
})
export class DemoRadioButtonComponent {
  formControl = new FormControl('ONE'); // TODO

  options = [
    {
      id: 'rd1',
      value: 'ONE',
      label: 'One',
      isChecked: true
    },
    {
      id: 'rd2',
      value: 'TWO',
      label: 'Two'
    },
    {
      id: 'rd3',
      value: 'THREE',
      label: 'Three'
    }
  ];
}
