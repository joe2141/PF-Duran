import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.scss']
})
export class FormularioComponent {

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

  registerForms: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.registerForms = this.formBuilder.group({
        nombre: this.nombreControl,
        apellido: this.apellidoControl,
        email: this.emailControl,
        curso: this.cursoControl,
    });
  }

  onSubmit(): void{
    if (this.registerForms.valid){
      console.log(this.registerForms.value);
    } else [
      alert('Error al llenar los campos')
    ]
  }

}
