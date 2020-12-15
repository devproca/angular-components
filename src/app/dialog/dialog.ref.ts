import {Type} from '@angular/core';

export class DialogRef {

  private closeCallback: (result: any) => void;

  constructor(public dynamicComponentType: Type<any>,
              private destroyCallback: () => void
  ) {
  }

  close(result?: any): void {
    if (this.closeCallback) {
      this.closeCallback(result);
    }
    this.destroyCallback();
  }

  onClosed(closeCallback: (result?: any) => void): void {
    this.closeCallback = closeCallback;
  }
}
