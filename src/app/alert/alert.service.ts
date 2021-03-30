import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';

import {AlertComponent} from './alert.component';


@Injectable()
export class AlertService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  success(containerRef: ViewContainerRef, inputMessage: string): void {
    const componentRef = this.createFactory(containerRef);
    componentRef.instance.type = 'success';
    componentRef.instance.message = inputMessage;
  }

  info(containerRef: ViewContainerRef, inputMessage: string): void {
    const componentRef = this.createFactory(containerRef);
    componentRef.instance.type = 'info';
    componentRef.instance.message = inputMessage;
  }

  warning(containerRef: ViewContainerRef, inputMessage: string): void {
    const componentRef = this.createFactory(containerRef);
    componentRef.instance.type = 'warning';
    componentRef.instance.message = inputMessage;
  }

  danger(containerRef: ViewContainerRef, inputMessage: string): void {
    const componentRef = this.createFactory(containerRef);
    componentRef.instance.type = 'danger';
    componentRef.instance.message = inputMessage;
  }

  createFactory(containerRef: ViewContainerRef): any {
    containerRef.clear();
    const factory = this.factoryResolver.resolveComponentFactory(AlertComponent);
    return containerRef.createComponent(factory);
  }

  destroyAlert(ref: ViewContainerRef): void {  // TODO
    ref.clear();
  }
}
