import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, Inject, InjectionToken,
  OnDestroy,
  OnInit, Type,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DialogRef} from './dialog.ref';


@Component({
  selector: 'tw-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('ref', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  private subscriptions: Subscription[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private dialogRef: DialogRef) {
  }

  ngOnInit(): void {
    this.handleCloseWhenRouteChanges();
  }

  ngAfterViewInit(): void {
    this.loadDynamicComponent();
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  close(result?: any): void {
    this.dialogRef.close(result);
  }

  private loadDynamicComponent(): void {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.dialogRef.dynamicComponentType);
    this.viewContainerRef.clear();
    this.viewContainerRef.createComponent(componentFactory);
  }

  private handleCloseWhenRouteChanges(): void {
    this.subscriptions.push(this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.close();
      }
    }));
  }

}
