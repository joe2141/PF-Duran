import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AlumnosComponent } from './alumnos.component';
import { DetallesAlumnosComponent } from './detalles-alumnos/detalles-alumnos.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: AlumnosComponent,
      },
      {
        path: ':id',
        component: DetallesAlumnosComponent,
      },
    ])
  ],
  exports: [
    RouterModule
  ]
})
export class AlumnosRoutingModule { }
