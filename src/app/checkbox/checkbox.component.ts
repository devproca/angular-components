import { Component, OnInit, Input, Output, EventEmitter, DoCheck, Injector, forwardRef, OnDestroy} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';

import { CheckboxService } from './checkbox.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'tw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
  // providers: [
  //   CheckboxService,
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => CheckboxComponent),
  //     multi: true,
  //   }
  // ]
})
export class CheckboxComponent implements OnInit, DoCheck, OnDestroy {
  private subscriptions: Subscription[] = [];
  // private onChangeCallback: (_: any) => void;
  // private onTouchedCallback: () => void;

  @Input() label: string;
  @Input() value: any;
  @Input() disabled = false;
  @Output() checked = new EventEmitter<void>();

  // value: any[] = []; // TODO: Make persistent between components.
  isChecked = false;
  error = false;

  constructor(private checkService: CheckboxService, private injector: Injector) { }

  ngOnInit(): void {
    this.checkService.add(this);
    //this.registerCheckedChanges();
    this.registerDisableChanges();
    this.registerErrorChanges();
  }

  ngDoCheck(): void {
    // const ngControl = this.injector.get(NgControl, null);
    //
    // if (ngControl) {
    //   this.error = !!ngControl.errors;
    // }
  }

  ngOnDestroy(): void {
    this.checkService.remove(this);
  }

  onChecked(): void {
    this.checkService.markChecked(this);
    this.checked.emit();
    // if (!this.isChecked) {
    //   this.addCheckedValue(this.checkBoxValue);
    // } else {
    //   this.removeValue(this.checkBoxValue);
    // }
  }

  // // TODO: Refactor to support multi-check.
  // private registerCheckedChanges(): void {
  //   this.subscriptions.push(this.checkService.checkedValue$.subscribe(checkedValue => {
  //     if (checkedValue === this.value) {
  //       this.isChecked = true;
  //     } else {
  //       this.isChecked = false;
  //     }
  //   }));
  // }

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

  // private addCheckedValue(value: any): void {
  //   this.isChecked = true;
  //
  //   if (!value) {
  //     this.value = [];
  //   } else {
  //       if (!this.value.some(v => v === value)) {
  //         this.value.push(value);
  //       }
  //   }
  //
  //   this.notifyChanges();
  // }

  // writeValue(value: any): void {
  //   if (!value) {
  //     this.value = [];
  //   } else if (Array.isArray(value)) {
  //     this.value = [...value];
  //   } else {
  //     this.value = [value];
  //   }
  // }

  // removeValue(value: any): void {
  //   const index = this.value.findIndex(v => v === value);
  //
  //   this.isChecked = false;
  //
  //   if (index !== -1) {
  //     this.value.splice(index, 1);
  //     this.notifyChanges();
  //   }
  // }
  //
  // private notifyChanges(): void {
  //   let value;
  //   value = [...this.value];
  //
  //   if (this.onChangeCallback) {
  //     this.onChangeCallback(value);
  //   }
  //   if (this.onTouchedCallback) {
  //     this.onTouchedCallback();
  //   }
  //
  //   this.checked.emit(value);
  // }

  // registerOnChange(onChange: (_: string) => void): void {
  //   this.onChangeCallback = onChange;
  // }
  //
  // registerOnTouched(onTouch: () => void): void {
  //   this.onTouchedCallback = onTouch;
  // }
  //
  // setDisabledState(disabled: boolean): void {
  //   this.disabled = disabled;
  // }
}
