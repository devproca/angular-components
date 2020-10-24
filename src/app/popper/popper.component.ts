import {AfterContentInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import Popper, {Placement} from 'popper.js';
import {fromEvent, Subscription} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-popper',
  templateUrl: './popper.component.html',
  styleUrls: ['./popper.component.scss']
})
export class PopperComponent implements OnInit, OnDestroy, AfterContentInit {

  @Input() placement: Placement = 'top';
  @Input() hideOnClick = false;
  @Output() closed = new EventEmitter<void>();
  @Output() opened = new EventEmitter<void>();
  private reference: HTMLElement;
  private content: HTMLElement;
  private open = false;
  private subscriptions: Subscription[] = [];
  private popperInstance: Popper;

  constructor(private el: ElementRef) {
  }

  ngOnInit(): void {
    this.subscribeToWindowClick();
    this.subscribeToWindowResize();
    this.subscribeToWindowBlur();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
    this.popperInstance?.destroy();
  }

  ngAfterContentInit(): void {
    this.reference = this.el.nativeElement.firstElementChild as HTMLElement;
    this.content = this.el.nativeElement.lastElementChild as HTMLElement;
    this.setContentStyleDisplay('none');
    this.setContentZIndex();
  }

  hide(): void {
    if (!this.open) {
      return;
    }

    this.closed.emit();
    this.open = false;
    this.setContentStyleDisplay('none');
  }

  show(): void {
    if (this.open) {
      return;
    }
    if (!this.popperInstance) {
      this.initializePopper();
    }
    this.opened.emit();
    this.open = true;
    this.setContentStyleDisplay('block');
  }

  private subscribeToWindowClick(): void {
    this.subscriptions.push(fromEvent<any>(window, 'click')
      .subscribe(event => {
        this.handleWindowClick(event);
      }));
  }

  private subscribeToWindowResize(): void {
    this.subscriptions.push(fromEvent<any>(window, 'resize')
      .pipe(debounceTime(50))
      .subscribe(_ => {
        this.onWindowResize();
      }));
  }

  private subscribeToWindowBlur(): void {
    this.subscriptions.push(fromEvent<any>(window, 'blur')
      .subscribe(_ => {
        this.onWindowHide();
      }));
  }

  private isReferenceClicked(event: MouseEvent): boolean {
    return event.composedPath().some(t => t === this.reference);
  }

  private isContentClicked(event: MouseEvent): boolean {
    return event.composedPath().some(t => t === this.content);
  }

  private handleWindowClick(event: MouseEvent): void {
    if (this.isReferenceClicked(event)) {
      this.show();
    } else if (this.isContentClicked(event)) {
      if (this.hideOnClick) {
        this.hide();
      }
    } else {
      this.hide();
    }
  }

  private onWindowHide(): void {
    this.hide();
  }

  private onWindowResize(): void {
    // this.updateContentWidth();
  }

  private setContentZIndex(): void {
    Object.assign(this.content.style, {
      'z-index': 9999
    });
  }

  private setContentStyleDisplay(style: string): void {
    Object.assign(this.content.style, {
      display: style
    });
  }

  private initializePopper(): void {
    this.popperInstance = new Popper(this.reference, this.content, {
      placement: this.placement,
      modifiers: {
        preventOverflow: {
          enabled: true
        },
        computeStyle: {
          gpuAcceleration: false
        }
      }
    });
  }
}
