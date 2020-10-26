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
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {PopperComponent} from '../popper/popper.component';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {ARROW_DOWN, ARROW_UP, BACKSPACE, ENTER, TAB} from '../util/keycodes.util';

const MAX_HEIGHT_PX = 300;

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
  @Input() value: any;
  @Input() error = false;
  @Output() change = new EventEmitter<any>();
  @ViewChild(PopperComponent) private popper: PopperComponent;
  @ViewChild('filter') private filter: ElementRef;
  @ViewChild('itemWrapper') private itemWrapper: ElementRef;
  @ViewChildren('item') private items: QueryList<ElementRef>;

  focused = false;
  filtering = false;
  filterTextControl = new FormControl();
  filteredOptions: SelectItemModel[] = [];
  activeItem: SelectItemModel;

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

  get selectedItem(): SelectItemModel {
    if (!this.options) {
      return null;
    }
    return this.options.find(o => o.value === this.value);
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

  get selectedValueLabel(): string {
    const selected = this.selectedValue;
    return selected === undefined ? '' : selected.label;
  }

  get selectedValue(): any {
    return this.options.find(o => o.value === this.value);
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

  handleClick(event, option: SelectItemModel): void {
    this.handleSelect(option.value);
    this.focus();
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
  }

  handleClose(): void {
    this.doneFiltering();
  }

  @HostListener('window:keydown', ['$event'])
  handleKeydown(event: KeyboardEvent): void {
    if (this.focused) {
      if ((event.key === ENTER || event.key === ARROW_DOWN) && !this.popper.open) {
        this.popper.show();
        return;
      } else if (event.key === TAB) {
        this.popper.hide();
        this.doneFiltering();
        return;
      } else if (event.key === BACKSPACE && !this.filtering) {
        this.handleSelect(null);
        return;
      } else if (this.isAnyLetterOrSpacePressed(event)) {
        this.filtering = true;
        this.popper.show();
        return;
      }
    }

    if (this.popper.open) {
      if (event.key === ENTER && this.activeItem) {
        this.handleSelect(this.activeItem.value);
        this.popper.hide();
      } else if (event.key === ARROW_DOWN) {
        //FIXME make scrolling work
        this.activeItem = this.getNextActiveItem(1);
      } else if (event.key === ARROW_UP) {
        this.activeItem = this.getNextActiveItem(-1);
      }
    }
  }

  private refreshScroll(nextActiveElement: ElementRef): void {
    //this is a mess
    // if (!nextActiveElement) {
    //   return;
    // }
    // const currentScrollTop = this.itemWrapper.nativeElement.scrollTop;
    // const nextElementBounds = nextActiveElement.nativeElement.getBoundingClientRect();
    //
    // console.log(currentScrollTop, ' : bot :', nextActiveElement.nativeElement.scrollTop);
    // if (nextElementBounds.top < currentScrollTop) {
    //   this.itemWrapper.nativeElement.scrollTop = nextElementBounds.top;
    // } else if (nextElementBounds.bottom > (currentScrollTop + MAX_HEIGHT_PX)) {
    //
    //   this.itemWrapper.nativeElement.scrollTop = nextElementBounds.bottom - MAX_HEIGHT_PX;
    // }
  }

  private registerFilterTextChanges(): void {
    this.subscriptions.push(this.filterTextControl.valueChanges.subscribe(v => {
      this.refreshFilteredOptions();
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

  private getNextActiveElement(offset: number): ElementRef {
    const items = this.items.toArray();
    if (!items || items.length === 0) {
      return null;
    }

    const currentIndex = items.findIndex(e => e.nativeElement.classList.contains('active'));
    if (currentIndex === -1 && offset === 1) {
      return items[0];
    }
    if (currentIndex === -1 && offset === -1) {
      return null;
    }

    const nextIndex = currentIndex + offset;

    if (nextIndex < 0) {
      return items[0];
    } else if (nextIndex >= this.items.length) {
      return items[items.length - 1];
    }
    return items[nextIndex];
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
