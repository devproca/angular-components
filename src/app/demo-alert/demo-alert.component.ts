import { AfterViewInit, Component, ViewChild, ViewContainerRef } from '@angular/core';

import { AlertService } from '../alert/alert.service';


@Component({
  selector: 'tw-demo-alert',
  templateUrl: './demo-alert.component.html',
  styleUrls: ['./demo-alert.component.scss'],
  providers: [
    AlertService
  ]
})
export class DemoAlertComponent implements AfterViewInit{

  @ViewChild('alert', { read: ViewContainerRef }) alert: ViewContainerRef;

  constructor(private alertService: AlertService) { }

  ngAfterViewInit(): void {
    this.alertService.success(this.alert, 'You have succeeded at your task. This is a success message that can be longer!');
  }
}
