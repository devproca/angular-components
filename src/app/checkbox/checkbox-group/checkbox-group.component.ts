import {Component, DoCheck, forwardRef, Injector, OnDestroy, OnInit} from '@angular/core';

import { CheckboxService } from '../checkbox.service';
import {ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl} from '@angular/forms';
import {Subscription} from 'rxjs';

@Component({
  selector: 'tw-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    CheckboxService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    }
  ]
})
export class CheckboxGroupComponent implements ControlValueAccessor, OnInit, DoCheck, OnDestroy {
  private subscriptions: Subscription[] = [];
  private onChange: (_: string) => void;
  private onTouched: () => void;

  values: any[] = [];

  constructor(private checkService: CheckboxService, private injector: Injector) { }

  ngOnInit(): void {
    this.registerCheckedChanges();
  }

  ngDoCheck(): void {
    const ngControl = this.injector.get(NgControl, null);

    if (ngControl) {
      this.checkService.markAsErrored(!!ngControl.errors);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: string): void {
    // TODO
    // if (!value) {
    //   this.values = [];
    // } else if (Array.isArray(value)) {
    //   this.values = [...value];
    // } else {
    //   this.values = [value];
    // }
  }

  registerOnChange(onChange: (_: string) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouched = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.checkService.markAsDisabled(disabled);
  }

  private registerCheckedChanges(): void {
    this.subscriptions.push(this.checkService.checkedValue$.subscribe(value => {
      if (this.onChange) {
        this.onChange(value);
      }
      if (this.onTouched) {
        this.onTouched();
      }
    }));
  }
}
