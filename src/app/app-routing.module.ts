import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TablasComponent } from './pages/tablas/tablas.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';

const routes: Routes = [
  {
    path:'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: 'estudiantes',
        component: TablasComponent
      },
      {
        path: 'cursos',
        component: CursosComponent
      },
      {
        path: 'inscripciones',
        component: InscripcionesComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo:  'dashboard'
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
