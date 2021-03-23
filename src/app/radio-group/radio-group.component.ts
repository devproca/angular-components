import { Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { Subscription } from 'rxjs';

import { RadioService } from './radio.service';


@Component({
  selector: 'tw-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss'],
  providers: [
    RadioService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioGroupComponent),
      multi: true,
    }
  ]
})
export class RadioGroupComponent implements OnInit, OnDestroy, ControlValueAccessor {

  private subscriptions: Subscription[] = [];

  private onChangeCallback: (_: string) => void;
  private onTouchedCallback: () => void;

  constructor(private radioService: RadioService) { }

  ngOnInit(): void {
    this.registerCheckedChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: string): void {
    this.radioService.markValueAsChecked(value);
  }

  registerOnChange(onChange: (_: string) => void): void {
    this.onChangeCallback = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouchedCallback = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.radioService.markAsDisabled(disabled);
  }

  private registerCheckedChanges(): void {
    this.subscriptions.push(this.radioService.checkedValue$.subscribe(value => {
      if (this.onChangeCallback) {
        this.onChangeCallback(value);
      }
      if (this.onTouchedCallback) {
        this.onTouchedCallback();
      }
    }));
  }
}
