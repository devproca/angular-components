import {Component} from '@angular/core';
import {AlertService} from './alert.service';

@Component({
  selector: 'tw-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

  alerts$ = this.alertService.alerts$;

  constructor(private alertService: AlertService) {
  }
}
