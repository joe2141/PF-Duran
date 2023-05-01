import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detalles-alumnos',
  templateUrl: './detalles-alumnos.component.html',
  styleUrls: ['./detalles-alumnos.component.scss']
})
export class DetallesAlumnosComponent {
 constructor(
  private activatedRoute: ActivatedRoute
 ) {
console.log(this.activatedRoute.snapshot.params)

 }


}
