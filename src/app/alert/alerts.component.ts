import {Component} from '@angular/core';
import {AlertService} from './alert.service';
import {AlertModel} from './alert.model';

@Component({
  selector: 'tw-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

  alerts$ = this.alertService.alerts$;

  constructor(private alertService: AlertService) {
  }

  handleClose(alert: AlertModel): void {
    this.alertService.remove(alert);
  }
}
