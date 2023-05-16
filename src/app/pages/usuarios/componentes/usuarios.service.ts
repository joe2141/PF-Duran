import { Injectable } from '@angular/core';
import { CrearUsuarioPayload, Usuario } from './models/indesx';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

const CURSOS_MOCKS: Usuario[] = [
  {
    id: 1,
    nombre: 'joel',
    correo: 'joel@mail.com',
    contrasena: '123456',
    role: 'admin'
  },
  {
    id: 2,
    nombre: 'Marty',
    correo: 'marty@email.com',
    contrasena: '12334',
    role: 'user'
  },
];

@Injectable({
  providedIn: 'root'
})
export class usuarioService {
  private usuarios$ = new BehaviorSubject<Usuario[]>([]);

  constructor() { }
  obtenerUsuarios(): Observable<Usuario[]> {
    this.usuarios$.next(CURSOS_MOCKS);
    return this.usuarios$.asObservable();
  }

  getUsuarioById(usuarioId: number): Observable<Usuario | undefined> {
    return this.usuarios$.asObservable()
      .pipe(
        map((usuarios) => usuarios.find((c) => c.id === usuarioId))
      )
  }

  crearUsuario(payload: CrearUsuarioPayload): Observable<Usuario[]> {
    this.usuarios$.pipe(take(1)).subscribe({
      next: (usuarios) => {
        this.usuarios$.next([
          ...usuarios,
          {
            id: usuarios.length + 1,
            ...payload,
          },
        ]);
      },
    });
    return this.usuarios$.asObservable();
  }

  editarUsuario(
    usuarioId: number,
    actualizacion: Partial<Usuario>
  ): Observable<Usuario[]> {
    this.usuarios$.pipe(take(1)).subscribe({
      next: (usuarios) => {
        const cursosActualizados = usuarios.map((usuario) => {
          if (usuario.id === usuarioId) {
            return {
              ...usuario,
              ...actualizacion,
            };
          } else {
            return usuario;
          }
        });
        this.usuarios$.next(cursosActualizados);
      },
    });
    return this.usuarios$.asObservable();
  }

  eliminarUsuario(usuarioId: number): Observable<Usuario[]> {
    this.usuarios$
      .pipe
      (
        take(1)
      )
      .subscribe({
        next: (usuario) => {
          const usuariosActualizados = usuario.filter((usuario) => usuario.id !== usuarioId)
          this.usuarios$.next(usuariosActualizados);
        },
      });
    return this.usuarios$.asObservable();
  }
}
