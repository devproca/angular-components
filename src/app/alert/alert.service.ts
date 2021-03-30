import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

import {AlertComponent} from './alert.component';


@Injectable()
export class AlertService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  success(containerRef: ViewContainerRef, inputMessage: string): void {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = containerRef.createComponent(factory);

    componentRef.instance.type = 'success';
    componentRef.instance.message = inputMessage;
  }
}
