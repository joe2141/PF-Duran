import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from './componentes/models';
import { InscripcionesService } from './componentes/services/inscripciones.service';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { Usuario } from '../usuarios/componentes/models/indesx';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit{
  dataSource = new MatTableDataSource<Inscripciones>();
  role: string | null | undefined;
  authUser$: Observable<Usuario | null>;
  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fecha_inscripcion', 'acciones'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }


  constructor(
    private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private authService: AuthService,)
    {
      this.authUser$ = this.authService.obtenerUsuarioAutenticado();
      this.inscripcionesService.obtenerInscripciones().subscribe((inscripciones) => {
      this.dataSource.data = inscripciones;
    });
  }

  abrirAbmInscripciones(): void {
    const dialogRef = this.matDialog.open(AbmInscripcionesComponent);

    dialogRef.afterClosed().subscribe((nuevaInscripcion) => {
      if (nuevaInscripcion) {
        // Guardar la nueva inscripción en la base de datos
        this.inscripcionesService.guardarInscripcion(nuevaInscripcion).subscribe((inscripcionGuardada) => {
          // Actualizar la tabla de datos con la nueva inscripción
          this.dataSource.data = [...this.dataSource.data, inscripcionGuardada];
        });
      }
    });
  }

  ngOnInit(): void {
    this.authUser$.subscribe((user: Usuario | null) => {
      if (user) {
        this.role = user.role;
      } else {
        this.role = null;
      }
    });
  }

  isAdminUser(): boolean {
    return this.role === 'admin';
  }

}
