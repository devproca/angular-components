import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnDestroy,
  Output,
  ViewChild
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgControl,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {PopperComponent} from '../popper/popper.component';
import {isValidDate, isValidForMax, isValidForMin} from '../util/date.util';

@Component({
  selector: 'tw-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ]
})
export class DatePickerComponent implements OnDestroy, ControlValueAccessor, Validator, DoCheck {

  private readonly maxDateError = $localize`:@@maxDateError:The date is greater than the allowed maximum.`;
  private readonly minDateError = $localize`:@@minDateError:The date is smaller than the allowed minimum.`;
  private readonly invalidError = $localize`:@@invalidError:The date is invalid.`;

  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() value: any;
  @Input() minDate;
  @Input() maxDate;
  @Output() change = new EventEmitter<string>();
  @ViewChild(PopperComponent) private popper: PopperComponent;

  focused = false;
  error = false;
  private onChange: (_: string) => void;
  private onTouch: () => void;

  constructor(private injector: Injector,
              private changeDetectorRef: ChangeDetectorRef) {
  }

  ngOnDestroy(): void {
    this.changeDetectorRef.detach();
  }

  handleFocus(): void {
    this.focused = true;
  }

  handleUnfocus(): void {
    this.focused = false;
    this.notifyChanges();
  }

  handleInput($event: Event): void {
    this.value = ($event.target as any).value;
    this.clearErrors();
  }

  handleCalendarChange(value: string): void {
    this.value = value;
    this.notifyChanges();
    this.popper.hide();
  }

  ngDoCheck(): void {
    const ngControl = this.ngControl;
    if (ngControl) {
      this.error = !!ngControl.errors;
    }
  }

  writeValue(value: string): void {
    this.value = value;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const errors = {} as any;

    if (!isValidDate(this.value)) {
      errors.valid = this.invalidError;
    } else {
      if (this.maxDate && !isValidForMax(this.value, this.maxDate)) {
        errors.max = this.maxDateError;
      }
      if (this.minDate && !isValidForMin(this.value, this.minDate)) {
        errors.min = this.minDateError;
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  registerOnChange(onChange: (_: any) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouch = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
  }

  private clearErrors(): void {
    this.error = false;
    if (this.ngControl) {
      this.ngControl.control.setErrors(null);
    }
  }

  private get ngControl(): NgControl {
    return this.injector.get(NgControl, null);
  }

  private notifyChanges(): void {
    const newValue = !this.value ? null : this.value;
    if (this.onChange) {
      this.onChange(newValue);
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.change.emit(newValue);
  }
}
