import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTitulo]'
})
export class TituloDirective {

  constructor(private elemento: ElementRef) {
    elemento.nativeElement.style.fontSize = "20px";
  }
}
