import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlumnosService } from '../componentes/services/alumnos.service';
import { Alumno } from '../componentes/models/index';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from '../../inscripciones/componentes/models';
import { InscripcionesService } from '../../inscripciones/componentes/services/inscripciones.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-detalles-alumnos',
  templateUrl: './detalles-alumnos.component.html',
  styleUrls: ['./detalles-alumnos.component.scss']
})
export class DetallesAlumnosComponent implements OnInit, OnDestroy {
  alumno: Alumno | undefined;
  inscripciones: Inscripciones[] | undefined;

  private destroyed$ = new Subject();
  dataSource = new MatTableDataSource<Inscripciones>();

  displayedColumns: string[] = ['id', 'curso', 'fecha_inscripcion', 'desuscribir'];

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
    private alumnosServices: AlumnosService,
  ) {}

  ngOnInit(): void {
    this.inscripcionesService
      .obtenerInscripciones()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones.filter(
          (x) => x.alumnoId === parseInt(this.activatedRoute.snapshot.params['id'])
        );
      });

    this.alumnosServices
      .obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
      .pipe(takeUntil(this.destroyed$))
      .subscribe((alumno) => (this.alumno = alumno));
  }

  eliminarInscripcion(inscripcion: Inscripciones): void {
    if (!confirm('¿Estás seguro de que deseas eliminar esta inscripción?')) {
      return;
    }

    this.inscripcionesService
      .eliminarInscripcion(inscripcion.id)
      .subscribe(() => {
        this.dataSource.data = this.dataSource.data.filter((x) => x.id !== inscripcion.id);
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
