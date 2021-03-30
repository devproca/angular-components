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

  @ViewChild('alertSuccess', { read: ViewContainerRef }) alertSuccess: ViewContainerRef;
  @ViewChild('alertInfo', { read: ViewContainerRef }) alertInfo: ViewContainerRef;
  @ViewChild('alertWarning', { read: ViewContainerRef }) alertWarning: ViewContainerRef;
  @ViewChild('alertDanger', { read: ViewContainerRef }) alertDanger: ViewContainerRef;

  constructor(private alertService: AlertService) { }

  ngAfterViewInit(): void {
    this.alertService.success(this.alertSuccess, 'You have succeeded at your task. This is a success message that can be longer!');
    this.alertService.info(this.alertInfo, 'Pay attention to this info before proceeding!');
    this.alertService.warning(this.alertWarning, 'Something you have done is causing a warning!');
    this.alertService.danger(this.alertDanger, 'Make changes before you submit again, something went wrong!');
  }
}
