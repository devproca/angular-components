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

const BLANK_OPTION = {value: null, label: ''} as SelectItemModel;

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
  @Input() value: any;
  @Input() error = false;
  @Output() change = new EventEmitter<any>();
  @ViewChild(PopperComponent) private popper: PopperComponent;
  @ViewChild('filter') private filter: ElementRef;

  filtering = false;
  filterTextControl = new FormControl();
  filteredOptions: SelectItemModel[] = [];

  private activeItem: SelectItemModel;
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

  get options(): SelectItemModel[] {
    return this._options;
  }

  @Input()
  set options(options: SelectItemModel[]) {
    if (!options) {
      this._options = [BLANK_OPTION];
    } else {
      this._options = [BLANK_OPTION, ...options];
    }
    this.refreshFilteredOptions();
  }

  get focused(): boolean {
    return document.activeElement === this.filter?.nativeElement;
  }

  get selectedValueLabel(): string {
    const selected = this.selectedValue;
    return selected === undefined ? '' : selected.label;
  }

  get selectedValue(): any {
    return this.options.find(o => o.value === this.value);
  }

  handleClick(event, option: SelectItemModel): void {
    this.handleSelect(option.value);
    this.filter.nativeElement.focus();
  }

  handleMouseEnter(option: SelectItemModel): void {
    this.activeItem = option;
  }

  handleMouseLeave(): void {
    this.activeItem = null;
  }

  writeValue(value: string): void {
    this.value = value;
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
    this.filter.nativeElement.focus();
  }

  handleClose(): void {
    this.doneFiltering();
  }

  @HostListener('window:keyup', ['$event'])
  handleKeyup(event: KeyboardEvent): void {
    if (!this.focused) {
      return;
    }

    if (event.key === 'Backspace' && !this.filtering) {
      this.handleSelect(null);
      return;
    } else if (this.isAnyLetterOrSpacePressed(event)) {
      this.filtering = true;
      return;
    }

    if (!this.popper.opened) {
      return;
    }

    if (event.key === 'Tab') {
      this.popper.hide();
    } else if (event.key === 'Enter' && this.activeItem) {
      this.handleSelect(this.activeItem.value);
      this.popper.hide();
    } else if (event.key === 'ArrowDown') {
      this.activeItem = this.getActiveItemAtOffset(1);
    } else if (event.key === 'ArrowUp') {
      this.activeItem = this.getActiveItemAtOffset(-1);
    }
  }

  private registerFilterTextChanges(): void {
    this.subscriptions.push(this.filterTextControl.valueChanges.subscribe(v => {
      this.refreshFilteredOptions();
    }));
  }

  private isAnyLetterOrSpacePressed(event: KeyboardEvent): boolean {
    return /^.$/u.test(event.key);
  }

  private getActiveItemAtOffset(offset: number): SelectItemModel {
    if (!this.filteredOptions || this.filteredOptions.length === 0) {
      return null;
    }

    if (!this.activeItem && offset === 1) {
      return this.filteredOptions[0];
    }

    if (!this.activeItem && offset === -1) {
      return null;
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
  }

  private doneFiltering(): void {
    this.filtering = false;
    this.filterTextControl.setValue('');
  }

  private handleSelect(value: any): void {
    this.doneFiltering();
    if (this.value !== value) {
      this.value = value;
      this.notifyChanges(this.value);
      this.filter.nativeElement.focus();
    }
  }

  private notifyChanges(value: any): void {
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
