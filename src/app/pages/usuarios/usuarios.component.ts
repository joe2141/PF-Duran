import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioService } from './componentes/usuarios.service';
import { AbmUsuariosComponent } from './abm-usuarios/abm-usuarios.component';
import { Usuario } from './componentes/models/indesx';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns = ['id', 'nombre', 'apellido', 'email', 'password', 'role', 'acciones'];

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private usuariosService: UsuarioService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.usuariosService.obtenerUsuarios().subscribe({
      next: (usuarios) => {
        this.dataSource.data = usuarios;
      },
    });
  }

  crearUsuario(): void {
    const dialog = this.dialog.open(AbmUsuariosComponent);

    dialog.afterClosed().subscribe((formValue) => {
      if (formValue) {
        this.usuariosService.crearUsuario(formValue).subscribe((nuevoUsuario) => {
          this.dataSource.data.push(nuevoUsuario);
          this.dataSource._updateChangeSubscription();
        });
      }
    });
  }


  editarUsuario(usuario: Usuario): void {
    const dialog = this.dialog.open(AbmUsuariosComponent, {
      data: {
        usuario,
      }
    })

    dialog.afterClosed()
      .subscribe((formValue) => {
        if (formValue) {
          this.usuariosService.editarUsuario(usuario.id, formValue);
        }
      })
  }

  eliminarUsuario(usuario: Usuario): void {
    if (confirm('¿Está seguro?')) {
      this.usuariosService.eliminarUsuario(usuario.id).subscribe(() => {
        // Eliminar el usuario de la tabla de datos
        this.dataSource.data = this.dataSource.data.filter((u) => u.id !== usuario.id);
      });
    }
  }

  aplicarFiltros(ev: Event): void {
    const inputValue = (ev.target as HTMLInputElement)?.value;
    this.dataSource.filter = inputValue?.trim()?.toLowerCase();
  }

}
