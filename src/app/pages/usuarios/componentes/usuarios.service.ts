import { Injectable } from '@angular/core';
import { CrearUsuarioPayload, Usuario } from './models/indesx';
import { Observable, of, switchMap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = `${enviroment.apiBaseUrl}/usuarios`;

  constructor(private http: HttpClient) { }

  obtenerUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUsuarioById(usuarioId: number): Observable<Usuario | undefined> {
    return this.http.get<Usuario>(`${this.apiUrl}/${usuarioId}`);
  }

  crearUsuario(usuario: Usuario): Observable<Usuario> {
    const nuevoUsuario: Usuario = {
      ...usuario,
      token: this.generarTokenAleatorio()
    };
    return this.http.post<Usuario>(this.apiUrl, nuevoUsuario);
  }

  editarUsuario(usuarioId: number, actualizacion: Partial<Usuario>): Observable<Usuario> {
    return this.http.patch<Usuario>(`${this.apiUrl}/${usuarioId}`, actualizacion);
  }

  eliminarUsuario(usuarioId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${usuarioId}`);
  }

  private generarTokenAleatorio(): string {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const longitud = 32;
    const array = new Uint8Array(longitud);
    const caracteresLength = caracteres.length;

    crypto.getRandomValues(array);

    let resultado = '';
    for (let i = 0; i < longitud; i++) {
      resultado += caracteres.charAt(array[i] % caracteresLength);
    }

    return resultado;
  }
}
