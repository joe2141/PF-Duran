import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AbmCursosComponent } from '../../cursos/abm-cursos/abm-cursos.component';
import { Usuario } from 'src/app/core/models';
import { UsuarioService } from '../componentes/usuarios.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Store } from '@ngrx/store';
import { UsuariosActions } from '../store/usuarios.actions';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-abm-usuarios',
  templateUrl: './abm-usuarios.component.html',
  styleUrls: ['./abm-usuarios.component.scss']
})
export class AbmUsuariosComponent implements OnInit, OnDestroy {
  usuario: Usuario[] | undefined


  usuarioIdControl = new FormControl<number | null>(null, [
    Validators.required,
  ]);


  usuarioForm = new FormGroup({
    usuarioId: this.usuarioIdControl,
  });

  destroyed$ = new Subject<void>();

  constructor(
    private usuariosService: UsuarioService,
    private dialogRef: DialogRef<AbmUsuariosComponent>,
    private store: Store
  ) {

  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  ngOnInit(): void {

  }

  onSave(): void {
    this.store.dispatch(
      UsuariosActions.createUsuarios({
        data: this.usuarioForm.value as Usuario,
      })
    );

    this.dialogRef.close();
  }
}
