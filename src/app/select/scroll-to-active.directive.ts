import { Directive, DoCheck, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[twScrollToActive]'
})
export class ScrollToActiveDirective implements DoCheck {

  @Input() scrollToActiveElement: any;
  @Input() scrollToActiveClass: string;

  constructor(private el: ElementRef) {
  }

  ngDoCheck(): void {
    if (this.scrollToActiveElement
        && this.el.nativeElement.classList.contains(this.scrollToActiveClass)
        && this.isOutsideView()) {
      this.el.nativeElement.scrollIntoView({block: "nearest"});
    }
  }

  private isOutsideView(): boolean {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const parentRect = this.scrollToActiveElement.getBoundingClientRect();
    return rect.bottom > parentRect.bottom || rect.top < parentRect.top;
  }

}
