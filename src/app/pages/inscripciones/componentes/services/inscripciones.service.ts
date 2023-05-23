import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Inscripciones } from '../models';
import { enviroment } from '../../../../../environments/environments';

const baseUrl = `${enviroment.apiBaseUrl}/dashboard/inscripciones` // Reemplaza esto con la URL de tu API

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  private inscripciones$: BehaviorSubject<Inscripciones[]> = new BehaviorSubject<Inscripciones[]>([]);

  constructor(private http: HttpClient) {
    this.obtenerInscripciones().subscribe((inscripciones) => {
      this.inscripciones$.next(inscripciones);
    });
  }

  obtenerInscripciones(): Observable<Inscripciones[]> {
    return this.http.get<Inscripciones[]>(baseUrl + '/inscripciones');
  }

  obtenerInscripcionPorId(id: number): Observable<Inscripciones | undefined> {
    return this.inscripciones$.asObservable().pipe(
      map((inscripciones) => inscripciones.find((a: Inscripciones) => a.id === id))
    );
  }

  obtenerInscripcionesPorAlumnoId(id: number): Observable<Inscripciones[]> {
    return this.inscripciones$.asObservable().pipe(
      map((inscripciones) => inscripciones.filter((a: Inscripciones) => a.alumnoId === id))
    );
  }

  obtenerInscripcionesPorCursoId(id: number): Observable<Inscripciones[]> {
    return this.inscripciones$.asObservable().pipe(
      map((inscripciones) => inscripciones.filter((a: Inscripciones) => a.cursoId === id))
    );
  }

  guardarInscripcion(inscripcion: Inscripciones): Observable<Inscripciones> {
    return this.http.post<Inscripciones>(baseUrl + '/inscripciones', inscripcion);
  }
}
