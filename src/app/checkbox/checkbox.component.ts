import {Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, Optional, forwardRef} from '@angular/core';

import {Subscription} from 'rxjs';

import {CheckboxService} from './checkbox.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';


@Component({
  selector: 'tw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CheckboxComponent),
    multi: true,
  }]
})
export class CheckboxComponent implements OnInit, OnDestroy, ControlValueAccessor {
  private subscriptions: Subscription[] = [];

  @Input() label: string;
  @Input() value: any;
  @Input() disabled = false;
  @Output() checked = new EventEmitter<void>();
  @Output() unchecked = new EventEmitter<void>();

  private onChange: (_: string) => void;
  private onTouched: () => void;

  isChecked = false;
  error = false;

  constructor(@Optional() private checkService: CheckboxService) {
  }

  ngOnInit(): void {
    if (this.checkService) {
      this.checkService.add(this);
      this.registerCheckChanges();
      this.registerDisableChanges();
      this.registerErrorChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.checkService) {
      this.checkService.remove(this);
    }
  }

  onClick(): void {
    this.isChecked = !this.isChecked;
    this.notifyChanges();
  }

  private registerCheckChanges(): void {
    this.subscriptions.push(this.checkService.checkedValue$.subscribe(checkedValues => {
      const isChecked = checkedValues.some(value => value === this.value);
      if (isChecked !== this.isChecked) {
        this.isChecked = isChecked;
      }
    }));
  }

  private registerDisableChanges(): void {
    this.subscriptions.push(this.checkService.checkDisable$.subscribe(disableState => {
      if (disableState === true) {
        this.disabled = true;
      } else {
        this.disabled = false;
      }
    }));
  }

  private registerErrorChanges(): void {
    this.subscriptions.push(this.checkService.checkError$.subscribe(errorState => {
      if (errorState === true) {
        this.error = true;
      } else {
        this.error = false;
      }
    }));
  }

  writeValue(value: string): void {
    this.isChecked = value === this.value;
  }

  registerOnChange(onChange: (_: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouched = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  private notifyChanges(): void {
    if (this.isChecked) {
      this.checkService?.markChecked(this);
      this.checked.emit();
    } else {
      this.checkService?.markUnchecked(this);
      this.unchecked.emit();
    }

    if (this.onChange) {
      this.onChange(this.isChecked ? this.value : null);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
