import { Component, Input, Output, EventEmitter, OnInit, DoCheck, OnDestroy, Optional, forwardRef, Injector } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { Subscription } from 'rxjs';
import {SlideToggleService} from './slide-toggle.service';

@Component({
  selector: 'tw-slide-toggle',
  templateUrl: './slide-toggle.component.html',
  styleUrls: ['./slide-toggle.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideToggleComponent),
      multi: true,
    }
  ]
})
export class SlideToggleComponent implements OnInit, DoCheck, OnDestroy, ControlValueAccessor {
  private subscriptions: Subscription[] = [];
  private onChange: (_: string) => void;
  private onTouched: () => void;

  @Input() label: string;
  @Input() value: any;
  @Input() disabled = false;
  @Output() toggled = new EventEmitter<void>();
  @Output() untoggled = new EventEmitter<void>();

  isChecked = false;
  error = false;

  constructor(@Optional() private toggleService: SlideToggleService,
              @Optional() private injector: Injector) {
  }

  ngOnInit(): void {
    if (this.toggleService) {
      this.toggleService.add(this);
      this.registerToggleChanges();
      this.registerDisableChanges();
      this.registerErrorChanges();
    }
  }

  ngDoCheck(): void {
    if (this.injector) {
      const ngControl = this.injector.get(NgControl, null);
      if (ngControl) {
        this.error = !!ngControl.errors;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.toggleService) {
      this.toggleService.remove(this);
    }
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onClick(): void {
    this.isChecked = !this.isChecked;
    this.notifyChanges();
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

  private registerToggleChanges(): void {
    this.subscriptions.push(this.toggleService.toggledValue$.subscribe(toggledValues => {
      const isChecked = toggledValues.some(value => value === this.value);
      if (isChecked !== this.isChecked) {
        this.isChecked = isChecked;
      }
    }));
  }

  private registerDisableChanges(): void {
    this.subscriptions.push(this.toggleService.checkDisable$.subscribe(disableState => {
      this.disabled = disableState === true;
    }));
  }

  private registerErrorChanges(): void {
    this.subscriptions.push(this.toggleService.checkError$.subscribe(errorState => {
      this.error = errorState === true;
    }));
  }

  private notifyChanges(): void {
    if (this.isChecked) {
      this.toggleService?.markToggled(this);
      this.toggled.emit();
    } else {
      this.toggleService?.markUntoggled(this);
      this.untoggled.emit();
    }

    if (this.onChange) {
      this.onChange(this.isChecked ? this.value : null);
    }
    if (this.onTouched) {
      this.onTouched();
    }
  }
}
