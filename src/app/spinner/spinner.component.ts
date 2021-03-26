import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tw-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'lg';
  @Input() style: '1' | '2' | '3' = '3';

  constructor() { }

  ngOnInit(): void {
  }

}
