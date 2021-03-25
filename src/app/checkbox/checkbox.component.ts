import { Component, Input, Output, EventEmitter, OnInit, OnDestroy} from '@angular/core';

import { Subscription } from 'rxjs';

import { CheckboxService } from './checkbox.service';


@Component({
  selector: 'tw-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  @Input() label: string;
  @Input() value: any;
  @Input() disabled = false;
  @Output() checked = new EventEmitter<void>();

  isChecked = false;
  error = false;

  constructor(private checkService: CheckboxService) { }

  ngOnInit(): void {
    this.checkService.add(this);

    this.registerDisableChanges();
    this.registerErrorChanges();
  }

  ngOnDestroy(): void {
    this.checkService.remove(this);
  }

  onChecked(): void {
    this.checkService.markChecked(this);

    if (this.isChecked === false) {
      this.isChecked = true;
    } else {
      this.isChecked = false;
    }

    this.checked.emit();
  }

  getValues(): string {
    return this.value;
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
}
