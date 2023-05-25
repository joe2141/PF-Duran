import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripciones } from '../../inscripciones/componentes/models';
import { MatDialog } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models/index';
import { InscripcionesService } from '../../inscripciones/componentes/services/inscripciones.service';
import { CursosService } from '../Componentes/services/cursos.service';
import { AlumnosService } from '../../alumnos/componentes/services/alumnos.service';

@Component({
  selector: 'app-detalles-cursos',
  templateUrl: './detalles-cursos.component.html',
  styleUrls: ['./detalles-cursos.component.scss']
})
export class DetallesCursosComponent {
  cursos: any[] = [];
  alumno: any[] = [];

  dataSource = new MatTableDataSource<Inscripciones>();

  displayedColumns: string[] = ['id', 'alumno', 'fecha_inicio', 'desuscribir']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private inscripcionesService: InscripcionesService,
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
  ) {}
  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe(cursos => {
      this.cursos = cursos;
    });
    this.alumnosService.obtenerAlumnos().subscribe(alumno => {
      this.alumno = alumno;
    });
    this.inscripcionesService.obtenerInscripciones()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones.filter(x => x.cursoId === parseInt(this.activatedRoute.snapshot.params['id']));
      })
  }

  desuscribirAlumno(alumnoForDelete: Alumno): void {
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== alumnoForDelete.id,
      );
    }
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
    obtenerFechaDeInicioporId(cursoId: number): string {
      const curso = this.cursos.find(c => c.id === cursoId);
      return curso ? curso.fecha_inicio : '';
    }
    obtenerNombreDelAlumnoporId(alumnoId: number): string {
      const alumno = this.alumno.find(a => a.id === alumnoId);
      return alumno ? alumno.nombre : '';
    }

}
