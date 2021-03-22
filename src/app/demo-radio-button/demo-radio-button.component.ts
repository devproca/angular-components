import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'tw-demo-radio-button',
  templateUrl: './demo-radio-button.component.html',
  styleUrls: ['./demo-radio-button.component.scss']
})
export class DemoRadioButtonComponent {
  formControl = new FormControl('ONE'); // TODO
  formControl2 = new FormControl('ONE'); // TODO

  value = 'ONE';
  value1 = 'ONE';
  value2 = 'ONE';

}
