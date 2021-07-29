import { Directive, OnDestroy, OnInit } from '@angular/core';

@Directive({
  selector: '[appFocusBack]',
})
export class FocusBackDirective implements OnInit, OnDestroy {
  private lastFocusedElement: Element;

  ngOnInit() {
    this.lastFocusedElement = document.activeElement;
  }

  ngOnDestroy() {
    if (this.lastFocusedElement) {
      (this.lastFocusedElement as HTMLElement).focus();
    }
  }
}
