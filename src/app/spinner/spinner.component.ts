import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tw-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'sm';
  @Input() spinnerStyle: 'style1' | 'style2' | 'style3' = 'style1';

  constructor() { }

  ngOnInit(): void {
  }

}
