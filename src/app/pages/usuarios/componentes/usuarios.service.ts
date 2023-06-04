import { Injectable } from '@angular/core';
import { Usuario } from './models/indesx';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from 'src/environments/environments';
import { concatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  obtenerUsuarios() {
    throw new Error('Method not implemented.');
  }
  eliminarUsuario(id: number) {
    throw new Error('Method not implemented.');
  }
  constructor(private httpClient: HttpClient) {}

  createUsuario(data: Usuario): Observable<Usuario> {
    return this.httpClient
    .post<Usuario>(`${enviroment.apiBaseUrl}/usuarios`, data)
    .pipe(
      concatMap((createResponser) =>
      this.getUsuarioById(createResponser.id)
    )
    );
  }

  getUsuarioById(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(
      `${enviroment.apiBaseUrl}/usuarios/${id}`
    )
  }

  getAllUsuarios(): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(
      `${enviroment.apiBaseUrl}/usuarios`
    );
  }

  deleteUsuarioById(id: number): Observable<unknown> {
    return this.httpClient.delete(
      `${enviroment.apiBaseUrl}/usuarios/${id}`
    );
  }

}
