import {
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
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
import {formatDate, isValidDate, isValidForMax, isValidForMin} from '../util/date.util';

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

  private readonly maxDateError = $localize`:@@tw.datePicker.maxDateError:The date is greater than the allowed maximum.`;
  private readonly minDateError = $localize`:@@tw.datePicker.minDateError:The date is smaller than the allowed minimum.`;
  private readonly invalidError = $localize`:@@tw.datePicker.invalidError:The date is invalid.`;

  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() value: any;
  @Input() minDate;
  @Input() maxDate;
  @Output() change = new EventEmitter<string>();
  @ViewChild(PopperComponent) private popper: PopperComponent;
  @ViewChild('ref') private input: ElementRef;

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
    const currentValue = ($event.target as any).value;
    const formattedCurrentValue = formatDate(currentValue);
    const currentKey = ($event as any).data;

    const cursorPosition = this.input.nativeElement.selectionStart;
    const currentValueToCursor = currentValue.substr(0, cursorPosition);
    const currentValueToCursorFormatted = formatDate(currentValueToCursor);
    const offsetRequired = currentKey == null ? 0 : this.calculateNumberOfInsertedDashes(currentValueToCursor, currentValueToCursorFormatted);
    const nextCursorPosition = cursorPosition + offsetRequired;

    this.input.nativeElement.value = formattedCurrentValue;
    this.input.nativeElement.setSelectionRange(nextCursorPosition, nextCursorPosition);
    this.value = formattedCurrentValue;
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

  private calculateNumberOfInsertedDashes(first: string, second: string): number {
    const n1 = first ? first.split('-').length - 1 : 0;
    const n2 = second ? second.split('-').length - 1 : 0;
    return n2 - n1;
  }
}
