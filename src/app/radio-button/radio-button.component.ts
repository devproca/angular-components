import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

import { Subscription } from 'rxjs';

import { RadioService } from './radio.service';


@Component({
  selector: 'tw-radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.scss']
})
export class RadioButtonComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() label: string;
  @Input() value: string;
  @Input() disabled = false;
  @Output() checked = new EventEmitter<void>();

  isChecked = false;
  error = false;

  constructor(private radioService: RadioService) { }

  ngOnInit(): void {
    this.radioService.add(this);
    this.registerCheckedChanges();
    this.registerDisableChanges();
    this.registerErrorChanges();
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
        this.isChecked = checkedValue === this.value;
      }));
  }

  private registerDisableChanges(): void {
    this.subscriptions.push(
      this.radioService.checkDisable$.subscribe(disableState => {
        this.disabled = disableState === true;
      }));
  }

  private registerErrorChanges(): void {
    this.subscriptions.push(
      this.radioService.checkError$.subscribe(errorState => {
        this.error = errorState === true;
      }));
  }
}
