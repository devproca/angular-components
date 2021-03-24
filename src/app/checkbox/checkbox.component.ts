import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, DoCheck, Injector, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { Subscription } from 'rxjs';


@Component({
  selector: 'tw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxComponent),
      multi: true,
    }
  ]
})
export class CheckboxComponent implements OnInit, DoCheck, OnDestroy, ControlValueAccessor {
  private subscriptions: Subscription[] = [];
  private onChangeCallback: (_: string) => void;
  private onTouchedCallback: () => void;

  @Input() label: string;
  @Input() value: string[];
  @Input() disabled = false;
  @Output() checked = new EventEmitter<any>();

  isChecked = false;
  error = false;

  constructor(private injector: Injector) { }

  // private registerCheckedChanges(): void {
  //   this.subscriptions.push(this.formControl.valueChanges.subscribe(v => {
  //
  //   }));
  // }

  ngOnInit(): void { }

  ngDoCheck(): void {
    const ngControl = this.injector.get(NgControl, null);

    if (ngControl) {
      this.error = !!ngControl.errors;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChecked(): void {
    if (!this.isChecked) {
      this.writeValue(this.value);
    } else {
      this.removeValue(this.value);
    }
  }

  writeValue(value: any): void {
    console.log('I AM ADDING ', value); // Test Line

    this.isChecked = true;

    if (!value) {
      this.value = [];
    } else if (Array.isArray(value)) {
      this.value = [...value];
    } else {
      this.value = [value];
    }

    this.notifyChanges();
  }

  private notifyChanges(): void {
    let value;

    value = [...this.value];

    if (this.onChangeCallback) {
      this.onChangeCallback(value);
    }

    if (this.onTouchedCallback) {
      this.onTouchedCallback();
    }

    this.checked.emit(value);
  }

  removeValue(value: any): void {
    const index = this.value.findIndex(v => v === value);

    console.log('REMOVING: ', this.value); // Test line.

    this.isChecked = false;

    if (index !== -1) {
      this.value.splice(index, 1);
      this.notifyChanges();
    }
  }

  registerOnChange(onChange: (_: string) => void): void {
    this.onChangeCallback = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouchedCallback = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    console.log('Disabled Status: ', this.disabled); // TODO: REMOVE TEST LINE
  }
}
