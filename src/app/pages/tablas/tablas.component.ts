import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { AbmAlumnosComponent } from './abm-alumnos/abm-alumnos.component';

export interface Estudiante {
  id: number;
  nombre:string;
  apellido: string;
  correo: string;
  curso: string;
  pais: string;
  fecha_registro: Date;
  acciones:string;

}

@Component({
  selector: 'app-tablas',
  templateUrl: './tablas.component.html',
  styleUrls: ['./tablas.component.scss']
})
export class TablasComponent {


  estudiantes: Estudiante[] = [
    {
      id:1,
      nombre: 'Kilian',
      apellido: 'Diez',
      correo: 'Kilian@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones:'hola'
    },
    {
      id: 2,
      nombre: 'Elia',
      apellido: 'Paz',
      correo: 'Elia@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones:'hola'
    },
    {
      id: 3,
      nombre: 'Edurne',
      apellido: 'Carballo',
      correo: 'Edurne@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones:'hola'
    },
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'nombreCompleto', 'correo', 'curso', 'pais', 'fecha_registro', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement )?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog) {}



  abrirABMalumnos(): void {
    const dialog = this.matDialog.open(AbmAlumnosComponent)

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {
        this.dataSource.data = [...this.dataSource.data,
        {
          ...valor,
          fecha_registro: new Date(),
          id: this.dataSource.data.length + 1,
        }
        ];
      }
  })
  }

  deleteAlumno(alumnoForDelete: Estudiante): void{
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== alumnoForDelete.id,
      );
    }
  }

actualizarAlumno(alumnoParaEditar: Estudiante): void{
  const dialog = this.matDialog.open(AbmAlumnosComponent, {
    data: {
      alumnoParaEditar
    }
  })
  dialog.afterClosed().subscribe((dataDelAlumnoEditado) => {
    if (dataDelAlumnoEditado) {
      this.dataSource.data= this.dataSource.data.map(
        (alumnoActual) => alumnoActual.id === alumnoParaEditar.id
        ? ({ ...alumnoActual, ...dataDelAlumnoEditado})
        : alumnoActual,
       );
    }
  })
}

abrirDetalles(alumnoForDelete: Estudiante): void{
  if (confirm("Esta seguro de borrar?")) {
    this.dataSource.data = this.dataSource.data.filter(
      (alumnoActual) => alumnoActual.id !== alumnoForDelete.id,
    );
  }
}



}
