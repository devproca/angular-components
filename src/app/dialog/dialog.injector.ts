import {InjectFlags, InjectionToken, Injector, Type} from '@angular/core';

export class DialogInjector implements Injector {

  constructor(private parentInjector: Injector,
              private additionalTokens: WeakMap<any, any>) {
  }

  get<T>(token: Type<T> | InjectionToken<T>, notFoundValue?: T, flags?: InjectFlags): T;
  get(token: any, notFoundValue?: any): any;
  get(token: any, notFoundValue?: any, flags?: any): any {

    const value = this.additionalTokens.get(token);
    return value ? value : this.parentInjector.get(token, notFoundValue);
  }
}
