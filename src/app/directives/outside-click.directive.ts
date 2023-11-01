import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  exportAs: 'outsideClickDirective'
})
export class OutsideClickDirective {

  @Output() clickOutside = new EventEmitter<void>

  _el: ElementRef
  public isOnTarget: boolean = false

  constructor(private el: ElementRef) {
    this._el = el;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    this.isOnTarget = (target == this._el.nativeElement || this._el.nativeElement.contains(target))
    if (!this.isOnTarget) {
      this.clickOutside.emit()
    }
  }
}
