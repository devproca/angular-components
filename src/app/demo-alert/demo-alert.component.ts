import {Component, OnInit} from '@angular/core';

import {AlertService} from '../alert/alert.service';


@Component({
  selector: 'tw-demo-alert',
  templateUrl: './demo-alert.component.html',
  styleUrls: ['./demo-alert.component.scss'],
  providers: [AlertService]
})
export class DemoAlertComponent implements OnInit {

  constructor(private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertService.success('This is a success', 'this is some subtext');

    setTimeout(() => {
      this.alertService.success('This is a second success');

    }, 2000);
  }

  clear(): void {
    this.alertService.clearAll();
  }

}
