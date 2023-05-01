import { Component, OnDestroy, Pipe } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlumnosService } from '../componentes/services/alumnos.service';
import { Alumno } from '../componentes/models/index';
import { Subject, takeUntil } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';


@Component({
  selector: 'app-detalles-alumnos',
  templateUrl: './detalles-alumnos.component.html',
  styleUrls: ['./detalles-alumnos.component.scss']
})
export class DetallesAlumnosComponent implements OnDestroy {

alumno: Alumno | undefined ;

private destroyed$ = new Subject()
dataSource = new MatTableDataSource<Alumno>();

 constructor(
  private activatedRoute: ActivatedRoute,
  private alumnosServices: AlumnosService,
 ) {
this.alumnosServices.obtenerAlumnoPorId(parseInt(this.activatedRoute.snapshot.params['id']))
.pipe(takeUntil(this.destroyed$))
.subscribe((alumno) => this.alumno = alumno);
 }
  ngOnDestroy(): void {
    this.destroyed$.next(true)
  }

  

}
