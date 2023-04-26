import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';

export interface Curso {
  id: number;
  nombre:string;
  fecha_registro: Date;
  acciones:string;

}

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent {

  cursos: Curso[] = [
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

  dataSource = new MatTableDataSource(this.cursos);

  displayedColumns: string[] = ['id', 'nombre', 'fecha_registro', 'acciones']

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement )?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog) {}

  abrirABMcursos(): void {
    const dialog = this.matDialog.open(AbmCursosComponent)

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

  deleteCursos(cursosForDelete: Curso): void{
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (cursoActual) => cursoActual.id !== cursosForDelete.id,
      );
    }
  }
  

actualizarCursos(cursosParaEditar: Curso): void{
  const dialog = this.matDialog.open(AbmCursosComponent, {
    data: {
      cursosParaEditar
    }
  })
  dialog.afterClosed().subscribe((dataDelCursoEditado) => {
    if (dataDelCursoEditado) {
      this.dataSource.data= this.dataSource.data.map(
        (cursoActual) => cursoActual.id === cursosParaEditar.id
        ? ({ ...cursoActual, ...dataDelCursoEditado})
        : cursoActual,
       );
    }
  })
}


}

