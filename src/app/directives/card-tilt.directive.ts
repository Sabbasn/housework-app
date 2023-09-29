import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appCardTilt]'
})
export class CardTiltDirective {

  constructor(private el: ElementRef) { }

  @Input('card') card : any;

  @HostListener("mousemove", ['$event']) onMouseMove($event: any) {
    this.tilt($event)
  }

  @HostListener("mouseout") onMouseOut() {
    this.el.nativeElement.style.transform = ''
    this.card.style.transition = '1s all ease'
  }

  private tilt($event: MouseEvent) {
    const width = this.card.offsetWidth
    const height = this.card.offsetHeight

    const x = $event.offsetX
    const y = $event.offsetY

    const multiplier = 25

    const xRotate = -multiplier * ((y - height / 2) / height)
    const yRotate = multiplier * ((x - width / 2) / width)

    this.card.style.transform = `perspective(500px) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`
    this.card.style.transition = ''
  }

}
