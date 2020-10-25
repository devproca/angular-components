import {Component} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  formControl = new FormControl('TWO');

  options = [
    {
      value: 'ONE',
      label: 'One asdkjfh alskjdf lkjasdhf lkjasdhf lkjasdhf lkjasdhf lkjasd flkjasd lkfjhadlflasdf a'
    },
    {
      value: 'TWO',
      label: 'Two'
    },
    {
      value: 'THREE',
      label: 'Three'
    },
    {
      value: 'FOUR',
      label: 'Four'
    },
    {
      value: 'FIVE',
      label: 'Five'
    },
    {
      value: 'SIX',
      label: 'Six'
    },
    {
      value: 'SEVEN',
      label: 'Seven'
    }
  ];

  enable(): void {
    this.formControl.enable();
  }

  disable(): void {
    this.formControl.disable();
  }

  error(): void {
    this.formControl.setErrors({somekey: 'this is an error'});
  }

}
