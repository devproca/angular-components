import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { RadioService } from '../radio-group/radio.service';


@Component({
  selector: 'tw-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit, OnDestroy {
  @Input() label: string;
  @Input() value: string;
  @Input() disabled = false; // TODO: Acquire disabled state from radio-group, which has form control, not here.
  @Output() checked = new EventEmitter<void>();

  isChecked = false;

  private subscriptions: Subscription[] = [];

  constructor(private radioService: RadioService) { }

  ngOnInit(): void {
    this.radioService.add(this);
    this.registerCheckedChanges();
    this.registerDisableChanges();
  }

  ngOnDestroy(): void {
    this.radioService.remove(this);
  }

  onChecked(): void {
    this.radioService.markChecked(this);
    this.checked.emit();
  }

  private registerCheckedChanges(): void {
    this.subscriptions.push(
      this.radioService.checkedValue$.subscribe(checkedValue => {
        if (checkedValue === this.value) {
          this.isChecked = true;
        } else {
          this.isChecked = false;
        }
      }));
  }

  private registerDisableChanges(): void {
    this.subscriptions.push(
      this.radioService.checkDisable$.subscribe(disableState => {
        if (disableState === true) {
          this.disabled = true;
        } else {
          this.disabled = false;
        }
      }));
  }
}