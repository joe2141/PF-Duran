import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AlumnosComponent } from './pages/alumnos/alumnos.component';
import { CursosComponent } from './pages/cursos/cursos.component';
import { InscripcionesComponent } from './pages/inscripciones/inscripciones.component';
import { DetallesAlumnosComponent } from './pages/alumnos/detalles-alumnos/detalles-alumnos.component';
import { DetallesCursosComponent } from './pages/cursos/detalles-cursos/detalles-cursos/detalles-cursos.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { MatLabel } from '@angular/material/form-field';
import { AuthGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then((m) => m.DashboardModule)
  },
  {
    path: 'auth',
    component: AuthComponent,
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
