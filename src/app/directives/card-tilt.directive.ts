import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appCardTilt]'
})
export class CardTiltDirective {

  constructor(private el: ElementRef) { }

  @HostListener("mousemove", ['$event']) onMouseMove($event: MouseEvent) {
    this.tilt($event)
  }

  @HostListener("mouseout") onMouseOut() {
    this.el.nativeElement.style.transform = ''
  }

  private tilt($event: MouseEvent) {
    const width = this.el.nativeElement.offsetWidth
    const height = this.el.nativeElement.offsetHeight

    const x = $event.offsetX
    const y = $event.offsetY
    const multiplier = 70

    const xRotate = multiplier * ((x - width / 2) / width)
    const yRotate = -multiplier * ((y - height / 2) / height)

    this.el.nativeElement.style.transform = `perspective(500px) scale(1.1) rotateX(${xRotate}deg) rotateY(${yRotate}deg)`
  }

}
