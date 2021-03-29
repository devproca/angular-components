import { Component, Input } from '@angular/core';


@Component({
  selector: 'tw-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @Input() size: 'xs' | 'sm' | 'md' | 'lg' = 'xs';
  @Input() spinnerStyle: 'style1' | 'style2' | 'style3' = 'style1';
  @Input() color: 'blue' | 'white' = 'blue';
}
