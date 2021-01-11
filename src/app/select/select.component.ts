import {
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Injector,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {PopperComponent} from '../popper/popper.component';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ARROW_DOWN, ARROW_UP, BACKSPACE, ENTER, ESCAPE, TAB} from '../util/keycodes.util';

@Component({
  selector: 'tw-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    }
  ]
})
export class SelectComponent implements ControlValueAccessor, OnInit, OnDestroy, DoCheck {

  @Input() disabled = false;
  @Input() placeholder: string;
  @Input() error = false;
  @Input() multiselect = false;
  @Output() change = new EventEmitter<any>();
  @ViewChild(PopperComponent) private popper: PopperComponent;
  @ViewChild('filter') private filter: ElementRef;

  focused = false;
  filtering = false;
  filterTextControl = new FormControl();
  filteredOptions: SelectItemModel[] = [];
  activeItem: SelectItemModel;
  value: any[] = [];

  private _options: SelectItemModel[] = [];
  private onChange: (_: any) => void;
  private onTouch: () => void;
  private subscriptions: Subscription[] = [];

  constructor(private injector: Injector) {
  }

  ngOnInit(): void {
    this.registerFilterTextChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  ngDoCheck(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.error = !!ngControl.errors;
    }
  }

  get selectedOptions(): SelectItemModel[] {
    if (!this.options) {
      return [];
    }
    return this.value
      .map(v => this.options.find(o => o.value === v))
      .filter(v => !!v);
  }

  get singleSelectValueLabel(): string {
    const selectedOption = this.hasValue() ? this.findOption(this.value[0]) : null;
    return selectedOption ? selectedOption.label : '';
  }

  findOption(value: any): SelectItemModel {
    return this.options.find(o => o.value === value);
  }

  isOptionSelected(option: SelectItemModel): boolean {
    return this.selectedOptions.some(o => o === option);
  }

  hasValue(): boolean {
    return this.value && this.value.length > 0;
  }

  get options(): SelectItemModel[] {
    return this._options;
  }

  @Input()
  set options(options: SelectItemModel[]) {
    if (!options) {
      this._options = [];
    } else {
      this._options = [...options];
    }
    this.refreshFilteredOptions();
  }


  focus(): void {
    this.focused = true;
    this.filter.nativeElement.focus();
  }

  handleFocus(): void {
    this.focused = true;
  }

  handleUnfocus(): void {
    this.focused = false;
  }

  handleClick(option: SelectItemModel): void {
    this.addSelectedValue(option.value);
    this.focus();
  }

  handleMouseEnter(option: SelectItemModel): void {
    this.activeItem = option;
  }

  handleMouseLeave(): void {
    this.activeItem = null;
  }

  writeValue(value: any): void {
    if (!value) {
      this.value = [];
    } else if (Array.isArray(value)) {

      this.value = [...value];
    } else {
      this.value = [value];
    }
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

  handleOpen(): void {
    this.activeItem = this.filteredOptions.find(o => o.value === this.value);
  }

  handleClose(): void {
    this.doneFiltering();
  }

  @HostListener('click', ['$event'])
  handleHostClick(): void {
    if (!this.disabled) {
      this.focus();
    }
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.focused) {
      if (event.key === ARROW_DOWN || event.key === ARROW_UP) {
        this.popper.show();
      } else if (event.key === TAB || event.key === ESCAPE) {
        this.popper.hide();
        this.doneFiltering();
      } else if (event.key === BACKSPACE && !this.filtering) {
        if (this.multiselect) {
          this.clearLastSelectedValue();
        } else {
          this.addSelectedValue(null);
        }
      } else if (this.isAnyLetterOrSpacePressed(event)) {
        this.filtering = true;
        this.popper.show();
      }
    }

    if (this.popper.open) {
      if (event.key === ENTER && this.activeItem) {
        this.addSelectedValue(this.activeItem.value);
        this.popper.hide();
        event.preventDefault();
      } else if (event.key === ARROW_DOWN) {
        this.activeItem = this.getNextActiveItem(1);
        event.preventDefault();
      } else if (event.key === ARROW_UP) {
        this.activeItem = this.getNextActiveItem(-1);
        event.preventDefault();
      }
    }
  }

  handleRemove(value: any): void {
    const index = this.value.findIndex(v => v === value);
    if (index !== -1) {
      this.value.splice(index, 1);
      this.notifyChanges();
      this.filter.nativeElement.focus();
    }
  }

  private registerFilterTextChanges(): void {
    this.subscriptions.push(this.filterTextControl.valueChanges.subscribe(v => {
      this.refreshFilteredOptions();
      if (this.filteredOptions?.length && this.filteredOptions.length < this.options.length) {
        this.activeItem = this.filteredOptions[0];
      }
    }));
  }

  private isAnyLetterOrSpacePressed(event: KeyboardEvent): boolean {
    return /^.$/u.test(event.key);
  }

  private getNextActiveItem(offset: number): SelectItemModel {
    if (!this.filteredOptions || this.filteredOptions.length === 0) {
      return null;
    }

    if (!this.activeItem && offset === 1) {
      return this.filteredOptions[0];
    }

    if (!this.activeItem && offset === -1) {
      return this.filteredOptions[this.filteredOptions.length - 1];
    }

    const nextIndex = this.filteredOptions.findIndex(o => o.value === this.activeItem.value) + offset;
    if (nextIndex < 0) {
      return this.filteredOptions[0];
    } else if (nextIndex >= this.filteredOptions.length) {
      return this.filteredOptions[this.filteredOptions.length - 1];
    }
    return this.filteredOptions[nextIndex];
  }

  private refreshFilteredOptions(): void {
    this.filteredOptions = this.options.filter(o => {
      if (!this.filterTextControl.value) {
        return true;
      }
      const lowerFilterText = this.filterTextControl.value.toLowerCase();
      return o.label.toLowerCase().includes(lowerFilterText);
    });
    this.popper?.update();
  }

  private doneFiltering(): void {
    this.filtering = false;
    this.filterTextControl.setValue('');
  }

  private clearLastSelectedValue(): void {
    if (this.value.length > 0) {
      this.value.splice(this.value.length - 1, 1);
      this.notifyChanges();
      this.filter.nativeElement.focus();
    }
  }

  private addSelectedValue(value: any): void {
    this.doneFiltering();
    if (!value) {
      this.value = [];
    } else if (!this.multiselect) {
      if (this.value !== value) {
        this.value = [value];
      }
    } else {
      if (!this.value.some(v => v === value)) {
        this.value.push(value);
      }
    }
    this.notifyChanges();
    this.filter.nativeElement.focus();
  }

  private notifyChanges(): void {
    let value;
    if (this.multiselect) {
      value = [...this.value];
    } else {
      value = this.value.length === 0 ? null : this.value[0];
    }

    if (this.onChange) {
      this.onChange(value);
    }
    if (this.onTouch) {
      this.onTouch();
    }
    this.change.emit(value);
  }
}

export class SelectItemModel {
  value: any;
  label: string;
}
