import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curso } from '../models/index';
import { enviroment } from '../../../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  private baseUrl = `${enviroment.apiBaseUrl}/cursos`;

  constructor(private http: HttpClient) { }

  obtenerCursos(): Observable<Curso[]> {
    return this.http.get<Curso[]>(this.baseUrl);
  }

  crearCurso(curso: Curso): Observable<Curso> {
    return this.http.post<Curso>(this.baseUrl, curso);
  }

  actualizarCurso(curso: Curso): Observable<Curso> {
    return this.http.put<Curso>(`${this.baseUrl}/${curso.id}`, curso);
  }

  eliminarCurso(cursoId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${cursoId}`);
  }
}


