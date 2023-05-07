import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AlumnosModule } from '../pages/alumnos/alumnos.module';
import { SharedModule } from '../shared/shared.module';
import { FormularioModule } from '../pages/formulario/formulario.module';
import { HoraComponent } from './hora/hora.component';
import { CursosModule } from '../pages/cursos/cursos.module';
import { InscripcionesModule } from '../pages/inscripciones/inscripciones.module';
import { RouterModule } from '@angular/router';
import { MatListModule } from '@angular/material/list'
import { AlumnosComponent } from '../pages/alumnos/alumnos.component';
import { DetallesAlumnosComponent } from '../pages/alumnos/detalles-alumnos/detalles-alumnos.component';
import { CursosComponent } from '../pages/cursos/cursos.component';
import { DetallesCursosComponent } from '../pages/cursos/detalles-cursos/detalles-cursos/detalles-cursos.component';
import { InscripcionesComponent } from '../pages/inscripciones/inscripciones.component';


@NgModule({
  declarations: [
    DashboardComponent,
    HoraComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    AlumnosModule,
    SharedModule,
    FormularioModule,
    CursosModule,
    InscripcionesModule,
    MatListModule,
    RouterModule.forChild([
      {
        path: 'estudiantes',
        loadChildren: () => import('../pages/alumnos/alumnos.module').then((m) => m.AlumnosModule)
      },
        {
          path: 'cursos',
          children: [
            {
              path: '',
              component: CursosComponent,
            },
            {
              path: ':id',
              component: DetallesCursosComponent
            }
          ]
        },
        {
          path: 'inscripciones',
          component: InscripcionesComponent,
        },

    ])


  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
