import { Component, Output, OnInit, DoCheck, OnDestroy, EventEmitter, Injector, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { Subscription } from 'rxjs';

import { SlideToggleService } from '../slide-toggle.service';


@Component({
  selector: 'tw-slide-group',
  templateUrl: './slide-group.component.html',
  styleUrls: ['./slide-group.component.scss'],
  providers: [
    SlideToggleService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SlideGroupComponent),
      multi: true,
    }
  ]
})
export class SlideGroupComponent implements OnInit, DoCheck, OnDestroy, ControlValueAccessor {
  private subscriptions: Subscription[] = [];
  private onChange: (_: string[]) => void;
  private onTouched: () => void;

  @Output() changes = new EventEmitter<string[]>();

  constructor(private toggleService: SlideToggleService,
              private injector: Injector) { }

  ngOnInit(): void {
    this.registerToggledChanges();
  }

  ngDoCheck(): void {
    const ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      this.toggleService.markAsErrored(!!ngControl.errors);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  writeValue(value: string[]): void {
    this.toggleService.setToggledValues(value);
  }

  registerOnChange(onChange: (_: string[]) => void): void {
    this.onChange = onChange;
  }

  registerOnTouched(onTouch: () => void): void {
    this.onTouched = onTouch;
  }

  setDisabledState(disabled: boolean): void {
    this.toggleService.markAsDisabled(disabled);
  }

  private registerToggledChanges(): void {
    this.subscriptions.push(this.toggleService.toggledValue$.subscribe(value => {
      this.changes.emit(value);
      if (this.onChange) {
        this.onChange(value);
      }
      if (this.onTouched) {
        this.onTouched();
      }
    }));
  }
}
