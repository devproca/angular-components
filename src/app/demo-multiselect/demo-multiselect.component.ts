import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'tw-demo-multiselect',
  templateUrl: './demo-multiselect.component.html',
  styleUrls: ['./demo-multiselect.component.scss']
})
export class DemoMultiselectComponent {

  formControl = new FormControl(['TWO']);

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
    },
    {
      value: 'EIGHT',
      label: 'Eight'
    },
    {
      value: 'NINE',
      label: 'Nine'
    },
    {
      value: 'TEN',
      label: 'Ten'
    },
    {
      value: 'ELEVEN',
      label: 'Eleven'
    },
    {
      value: 'TWELVE',
      label: 'Twelve'
    },
    {
      value: 'THIRTEEN',
      label: 'Thirteen'
    },
    {
      value: 'FOURTEEN',
      label: 'Fourteen'
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

  get errors(): string[] {
    return this.formControl.errors ? Object.values(this.formControl.errors) : null;
  }
}
