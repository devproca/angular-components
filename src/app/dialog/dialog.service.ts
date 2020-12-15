import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  EmbeddedViewRef,
  Injectable,
  Injector,
  Type
} from '@angular/core';
import {DialogConfig} from './dialog-config.model';
import {DialogComponent} from './dialog.component';
import {DialogInjector} from './dialog.injector';
import {DialogRef} from './dialog.ref';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  private dialogComponentRef: ComponentRef<DialogComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private applicationRef: ApplicationRef,
              private injector: Injector) {
  }


  open(componentType: Type<any>, dialogConfig?: DialogConfig): DialogRef {
    const dialogRef = new DialogRef(componentType, () => {
      this.destroyCallback();
    });

    const additionalTokens = new WeakMap();
    additionalTokens.set(DialogConfig, dialogConfig ? dialogConfig : {});
    additionalTokens.set(DialogRef, dialogRef);

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogComponent);
    const componentInjector = new DialogInjector(this.injector, additionalTokens);
    this.dialogComponentRef = componentFactory.create(componentInjector);

    this.applicationRef.attachView(this.dialogComponentRef.hostView);
    const dialogElement = (this.dialogComponentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    document.body.appendChild(dialogElement);
    return dialogRef;
  }

  destroyCallback(): void {
    if (this.dialogComponentRef) {
      this.applicationRef.detachView(this.dialogComponentRef.hostView);
      this.dialogComponentRef.destroy();
      this.dialogComponentRef = null;
    }
  }
}
