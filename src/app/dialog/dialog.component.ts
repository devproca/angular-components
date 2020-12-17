import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {DialogRef} from './dialog.ref';
import {DialogConfig} from './dialog-config.model';
import {animate, state, style, transition, trigger} from "@angular/animations";

const ANIMATION_DURATION = 200;

@Component({
  selector: 'tw-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
  animations: [
    trigger('fadeInOut', [
      state('in', style({
      })),
      state('out', style({
        opacity: 0
      })),
      transition('in => out', animate('200ms ease-in-out')),
      transition('out => in', animate('200ms ease-in-out'))
    ]),
  ]
})
export class DialogComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('ref', {read: ViewContainerRef}) viewContainerRef: ViewContainerRef;

  size: string;

  state: 'in' | 'out' = 'out';

  subscriptions: Subscription[] = [];

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private changeDetectorRef: ChangeDetectorRef,
              private router: Router,
              private dialogConfig: DialogConfig,
              private dialogRef: DialogRef) {
  }

  ngOnInit(): void {
    this.initializeSize();
    this.handleCloseWhenRouteChanges();
  }

  ngAfterViewInit(): void {
    this.loadDynamicComponent();
    this.state = 'in';
    this.changeDetectorRef.detectChanges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  close(result?: any): void {
    this.state = 'out';
    setTimeout(() => {
      this.dialogRef.close(result);
    }, ANIMATION_DURATION);
  }

  private initializeSize(): void {
    if (this.dialogConfig.size) {
      this.size = this.dialogConfig.size;
    } else {
      this.size = 'md';
    }
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
