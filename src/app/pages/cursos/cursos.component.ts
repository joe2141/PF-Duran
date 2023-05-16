import { Component, OnInit } from '@angular/core';
import { CursosService } from './Componentes/services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { AbmCursosComponent } from './abm-cursos/abm-cursos.component';
import { Curso } from './Componentes/models/index';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../../core/models/index'
import { AuthService } from 'src/app/auth/services/auth.service';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  dataSource = new MatTableDataSource();
  displayedColumns = ['id', 'nombre', 'fecha_inicio', 'fecha_fin', 'acciones'];

  authUser$: Observable<Usuario | null>;
  role: string | null | undefined;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cursosService: CursosService,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.obtenerUsuarioAutenticado();
  }

  abrirDetallesCurso(cursoId: number): void {
    this.router.navigate([cursoId], {
      relativeTo: this.activatedRoute,
    });
  }

  ngOnInit(): void {
    this.authUser$.subscribe((user: Usuario | null) => {
      if (user) {
        this.role = user.role;
      } else {
        this.role = null;
      }
    });

    this.cursosService.obtenerCursos().subscribe({
      next: (cursos) => {
        this.dataSource.data = cursos;
      },
    });
  }

  crearCurso(): void {
    const dialog = this.dialog.open(AbmCursosComponent);

    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.cursosService.crearCurso(formValue);
      }
    });
  }

  editarCurso(curso: Curso): void {
    const dialog = this.dialog.open(AbmCursosComponent, {
      data: {
        curso,
      },
    });

    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.cursosService.editarCurso(curso.id, formValue);
      }
    });
  }

  eliminarCurso(curso: Curso): void {
    if (confirm('¿Está seguro?')) {
      this.cursosService.eliminarCurso(curso.id);
    }
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

  isAdminUser(): boolean {
    return this.role === 'admin';
  }
}
