import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TablasModule } from '../pages/tablas/tablas.module';
import { SharedModule } from '../shared/shared.module';
import { FormularioModule } from '../pages/formulario/formulario.module';
import { HoraComponent } from './hora/hora.component';
import { CursosModule } from '../pages/cursos/cursos.module';
import { InscripcionesModule } from '../pages/inscripciones/inscripciones.module';


@NgModule({
  declarations: [
    DashboardComponent,
    HoraComponent
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    TablasModule,
    SharedModule,
    FormularioModule,
    CursosModule,
    InscripcionesModule
  ],
  exports: [
    DashboardComponent,
  ]
})
export class DashboardModule { }
