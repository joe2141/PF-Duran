import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormRecord, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Curso } from '../Componentes/models';

@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss'],
})
export class AbmCursosComponent implements OnInit {
  cursoParaEditar: Curso | undefined;
  nombreControl = new FormControl('', [Validators.required, Validators.minLength(3),]);
  fechaInicioControl = new FormControl('', [Validators.required]);
  fechaFinControl = new FormControl('', [Validators.required]);

  cursosForm = new FormGroup({
    nombre: this.nombreControl,
    fecha_inicio: this.fechaInicioControl,
    fecha_fin: this.fechaFinControl,
  })

  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any
  ) {
    if (data) {
      const cursoParaEditar = data.curso;
      this.nombreControl.setValue(cursoParaEditar.nombre);
      this.fechaInicioControl.setValue(cursoParaEditar.fecha_inicio);
      this.fechaFinControl.setValue(cursoParaEditar.fecha_fin);
    }
  }

  ngOnInit(): void {
    this.cursoParaEditar = this.data?.cursoParaEditar;
  }

  guardar(): void {
    if (this.cursosForm.valid) {
      this.dialogRef.close(this.cursosForm.value);
    } else {
      this.cursosForm.markAllAsTouched();
    }
  }
}
