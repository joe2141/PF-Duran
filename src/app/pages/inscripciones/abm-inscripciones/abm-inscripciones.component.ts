import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Alumno } from '../../alumnos/componentes/models';
import { AlumnosService } from '../../alumnos/componentes/services/alumnos.service';
import { Curso } from '../../cursos/Componentes/models';
import { CursosService } from '../../cursos/Componentes/services/cursos.service';
import { InscripcionesService } from '../componentes/services/inscripciones.service';



@Component({
  selector: 'app-abm-inscripciones',
  templateUrl: './abm-inscripciones.component.html',
  styleUrls: ['./abm-inscripciones.component.scss']
})
export class AbmInscripcionesComponent {
  alumnoControl = new FormControl('', [Validators.required]);
  cursoControl = new FormControl('',[Validators.required,Validators.minLength(3),]);
  fechaControl = new FormControl('',[Validators.required,]);

  alumnos: Alumno[] = [];
  cursos: Curso[] = [];

  inscripcionesForms = new FormGroup({
    curso: this.cursoControl,
    fecha: this.fechaControl
  })

  constructor(
    private cursosService: CursosService,
    private alumnosService: AlumnosService,
    private dialogRef: MatDialogRef<AbmInscripcionesComponent>,
    private inscripcionesService: InscripcionesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.alumnosService.obtenerAlumnos().subscribe((alumnos) => {
      this.alumnos = alumnos;
    });
    this.cursosService.obtenerCursos().subscribe((cursos) => {
      this.cursos = cursos;
    });
  }

  guardar(): void {
    if (this.inscripcionesForms.valid) {
      const inscripcion = {
        id: 3,
        alumnoId: this.alumnoControl.value,
        cursoId: this.cursoControl.value,
        fecha_inscripcion: this.fechaControl.value
      };
      this.dialogRef.close(inscripcion);
    } else {
      this.inscripcionesForms.markAllAsTouched();
    }
  }

}
