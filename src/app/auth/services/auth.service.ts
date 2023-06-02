import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, BehaviorSubject, map, catchError, of } from 'rxjs';
import { Usuario } from 'src/app/core/models';
import { Appstate } from 'src/app/store.ts';
import { enviroment } from 'src/environments/environments';
import { EstablecerUsuariosAutenticado, QuitarUsuarioAuntrnticado } from '../../store.ts/auth/auth.actions';
import { selectAuthUser } from 'src/app/store.ts/auth/auth.selector';

export interface LoginFormValue {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(
    private router: Router,
    private httpClient: HttpClient,
    private store: Store<Appstate>,
  ) { }

  obtenerUsuarioAutenticado(): Observable<Usuario | null> {
    return this.store.select(selectAuthUser);
  }

  establecerUsuariosAutenticado(usuario: Usuario): void {
    this.store.dispatch(EstablecerUsuariosAutenticado({ payload: usuario }))
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`,
      {
        params: {
          ...formValue
        },
      }
    ).subscribe({
      next: (usuarios) => {
        const usuarioAutenticado = usuarios[0];
        if (usuarioAutenticado) {
          localStorage.setItem('token', usuarioAutenticado.token)
          this.establecerUsuariosAutenticado(usuarioAutenticado);
          this.router.navigate(['dashboard']);
        } else {
          alert('¡Usuario y password incorrectos!')
        }
      }
    });
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(QuitarUsuarioAuntrnticado());
    this.router.navigate(['auth']);
  }

  verificarToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios?token=${token}`,
      {
        headers: new HttpHeaders({
          'Authorization': token || '',
        }),
      }
    )
      .pipe(
        map((usuarios) => {
          const usuarioAutenticado = usuarios[0];
          if (usuarioAutenticado) {
            localStorage.setItem('token', usuarioAutenticado.token)
            this.establecerUsuariosAutenticado(usuarioAutenticado)
          }
          return !!usuarioAutenticado;
        }),
        catchError(() => {
          return of(false);
        })
      );
  }
}
