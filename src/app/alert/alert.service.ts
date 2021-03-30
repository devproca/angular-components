import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

import {AlertComponent} from './alert.component';


@Injectable()
export class AlertService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  // TODO: MOVE REPETITIVE CODE TO ANOTHER FUNCTION!!!!!!

  success(containerRef: ViewContainerRef, inputMessage: string): void {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = containerRef.createComponent(factory);

    componentRef.instance.type = 'success';
    componentRef.instance.message = inputMessage;
  }

  info(containerRef: ViewContainerRef, inputMessage: string): void {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = containerRef.createComponent(factory);

    componentRef.instance.type = 'info';
    componentRef.instance.message = inputMessage;
  }

  warning(containerRef: ViewContainerRef, inputMessage: string): void {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = containerRef.createComponent(factory);

    componentRef.instance.type = 'warning';
    componentRef.instance.message = inputMessage;
  }

  danger(containerRef: ViewContainerRef, inputMessage: string): void {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    const componentRef = containerRef.createComponent(factory);

    componentRef.instance.type = 'danger';
    componentRef.instance.message = inputMessage;
  }
}
