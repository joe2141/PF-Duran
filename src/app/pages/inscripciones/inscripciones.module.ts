import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscripcionesComponent } from '../inscripciones/inscripciones.component';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';



@NgModule({
  declarations: [
    InscripcionesComponent,
    AbmInscripcionesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InscripcionesComponent
  ]
})
export class InscripcionesModule { }
