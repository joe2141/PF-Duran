import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';
import { Dialog } from '@angular/cdk/dialog';


export interface Inscripcion {
  id: number;
  nombre:string;
  fecha_registro: Date;
  acciones:string;

}

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {

  inscripciones: Inscripcion[] = [
    {
      id:1,
      nombre: 'Angular',
      fecha_registro: new Date(),
      acciones:'hola'
    },
    {
      id: 2,
      nombre: 'React',
      fecha_registro: new Date(),
      acciones:'hola'
    },
    {
      id: 3,
      nombre: 'Asado Profecional',
      fecha_registro: new Date(),
      acciones:'hola'
    },
  ];

  dataSource = new MatTableDataSource(this.inscripciones)

  displayedColumns: string[] = ['id', 'nombre', 'fecha_registro', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement )?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog) {}

  abrirABMinscripciones(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent)

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

  deleteInscripciones(inscripcionForDelete: Inscripcion): void{
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (inscripcionActual) => inscripcionActual.id !== inscripcionForDelete.id,
      );
    }
  }

  actualizarInscripciones(inscripcionesParaEditar: Inscripcion): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcionesParaEditar
      }
    })
    dialog.afterClosed().subscribe((dataDeInspecionesEditado) => {
      if (dataDeInspecionesEditado) {
        this.dataSource.data = this.dataSource.data.map(
          (inscripcionActual) => inscripcionActual.id === inscripcionesParaEditar.id
          ? ({ ...inscripcionActual, ...dataDeInspecionesEditado})
          : inscripcionActual,
        );
      }
    })

  }





}
