import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Inscripciones } from './componentes/models';
import { InscripcionesService } from './componentes/services/cursos.service';
import { ActivatedRoute } from '@angular/router';
import { AbmInscripcionesComponent } from './abm-inscripciones/abm-inscripciones.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent {
  dataSource = new MatTableDataSource<Inscripciones>();

  displayedColumns: string[] = ['id', 'alumno', 'curso', 'fecha_inicio', 'acciones']
  router: any;

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  constructor(private matDialog: MatDialog,
    private inscripcionesService: InscripcionesService,
    private activatesRoute: ActivatedRoute,
    ) {
      this.inscripcionesService.obtenerInscripciones()
      .subscribe((inscripciones) => {
        this.dataSource.data = inscripciones;
      });
  }

  irAlDetalle(inscripcionId: number): void {
    this.router.navigate([inscripcionId], {
      relativeTo: this.activatesRoute,
    });
  }



  abrirABMinscripciones(): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent)

    dialog.afterClosed().subscribe((valor) => {
      if (valor) {

        this.dataSource.data = [...this.dataSource.data,

        {

          ...valor,
          fecha_inicio: new Date(),
          id: this.dataSource.data.length + 1,
        }
        ];
      }
      console.log(valor);
    })
  }

  deleteInscripciones(inscripcionesForDelete: Inscripciones): void {
    if (confirm("Esta seguro de borrar?")) {
      this.dataSource.data = this.dataSource.data.filter(
        (alumnoActual) => alumnoActual.id !== inscripcionesForDelete.id,
      );
    }
  }
  actualizarinscripciones(inscripcionesParaEditar: Inscripciones): void {
    const dialog = this.matDialog.open(AbmInscripcionesComponent, {
      data: {
        inscripcionesParaEditar
      }
    })
    dialog.afterClosed().subscribe((dataDelAInscripcionEditada) => {
      if (dataDelAInscripcionEditada) {
        this.dataSource.data = this.dataSource.data.map(
          (inscripcionActual) => inscripcionActual.id === inscripcionesParaEditar.id
            ? ({ ...inscripcionActual, ...dataDelAInscripcionEditada })
            : inscripcionActual,
        );
      }
    })
  }

}
