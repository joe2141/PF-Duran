import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-abm-alumnos',
  templateUrl: './abm-alumnos.component.html',
  styleUrls: ['./abm-alumnos.component.scss']
})
export class AbmAlumnosComponent {

  nombreControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(3),
  ]
  );

  apellidoControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(5)
  ]
  );

  emailControl = new FormControl('',
  [
    Validators.required,
    Validators.email
  ]
  );

  cursoControl = new FormControl('',
  [
    Validators.required,
  ]
  );

  paisControl = new FormControl('',
  [
    Validators.required,
    Validators.minLength(5)
  ]
  );

  alumnoForms = new FormGroup({
    nombre: this.nombreControl,
    apellido: this.apellidoControl,
    correo: this.emailControl,
    curso: this.cursoControl,
    pais: this.paisControl
  })

  constructor(private dialogRef: MatDialogRef<AbmAlumnosComponent>) {}

  guardar():void {
    if (this.alumnoForms.valid){
      this.dialogRef.close(this.alumnoForms.value)
    } else {
      this.alumnoForms.markAllAsTouched();
    }

  }
}
