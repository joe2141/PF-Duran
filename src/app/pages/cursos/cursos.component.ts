import { Component, OnInit } from '@angular/core';
import { CursosService } from './Componentes/services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { Dialog } from '@angular/cdk/dialog';
import { CrearCursoPayload } from './Componentes/models/index';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = [
  'id',
  'nombre',
  'fecha_inicio',
  'fecha_fin',
  'acciones'];

  constructor(private cursosService: CursosService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  crearCurso(): void {
    this.dialog.open(AbmCursosComponent)
  }



  actualizarCurso(): void {}
  deleteCurso(): void {}
  abrirDetallesCurso(): void {}

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }
}
