import { Directive, ElementRef, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[appOutsideClick]',
  exportAs: 'outsideClickDirective'
})
export class OutsideClickDirective {

  @Output() clickOutside = new EventEmitter<void>

  @Input() countAsInside: Element[] = []

  _el: ElementRef
  public isOnTarget: boolean = false

  constructor(private el: ElementRef) {
    this._el = el;
  }

  @HostListener('document:click', ['$event.target'])
  onClick(target: any) {
    this.countAsInside.push(this._el.nativeElement)
    this.isOnTarget = this.countAsInside.some(e => e == target || e.contains(target))
    if (!this.isOnTarget) {
      this.clickOutside.emit()
    }
  }
}
