import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';


export interface Estudiante {
  id: number;
  nombre:string;
  apellido: string;
  correo: string;
  curso: string;
  pais: string;
  fecha_registro: Date;

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
      fecha_registro: new Date()
    },
    {
      id: 2,
      nombre: 'Elia',
      apellido: 'Paz',
      correo: 'Elia@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date()
    },
    {
      id: 3,
      nombre: 'Edurne',
      apellido: 'Carballo',
      correo: 'Edurne@mail.com',
      curso: 'Angular',
      pais: 'Argentina',
      fecha_registro: new Date()
    },
  ];

  dataSource = new MatTableDataSource(this.estudiantes);

  displayedColumns: string[] = ['id', 'nombreCompleto', 'correo', 'curso', 'pais', 'fecha_registro']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement )?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }
}
