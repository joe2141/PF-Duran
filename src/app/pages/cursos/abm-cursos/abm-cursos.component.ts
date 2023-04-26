import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';



@Component({
  selector: 'app-abm-cursos',
  templateUrl: './abm-cursos.component.html',
  styleUrls: ['./abm-cursos.component.scss']
})
export class AbmCursosComponent {

  nombreControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3),
  ]
  );

  cursosForms = new FormGroup({
    nombre: this.nombreControl,
  })

  constructor(
    private dialogRef: MatDialogRef<AbmCursosComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    ) {
      if (data) {
        this.nombreControl.setValue(data.cursoParaEditar.nombre);
      }
    }

  guardar():void {
    if (this.cursosForms.valid){
      this.dialogRef.close(this.cursosForms.value)
    } else {
      this.cursosForms.markAllAsTouched();
    }

  }


}
