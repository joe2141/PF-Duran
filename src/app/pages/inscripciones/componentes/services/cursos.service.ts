import { Injectable } from '@angular/core';
import { Inscripciones } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InscripcionesService {

  private inscripciones$ = new BehaviorSubject<Inscripciones[]>([
    {
      id:1,
      alumno: 'Kilian',
      curso: 'Angular',
      fecha_inicio: new Date(),
      acciones: '',
    },
    {
      id: 2,
      alumno: 'Elia',
      curso: 'React',
      fecha_inicio: new Date(),
      acciones: '',
    },
    {
      id: 3,
      alumno: 'Edurne',
      curso: 'Android',
      fecha_inicio: new Date(),
      acciones: '',
    },
  ])

  constructor() { }

  obtenerInscripciones(): Observable<Inscripciones[]> {
    return this.inscripciones$.asObservable();
  }

  obtenerInscripcionesPorId(id: number): Observable<Inscripciones | undefined>{
    return this.inscripciones$.asObservable()
    .pipe(
      map((inscripciones) => inscripciones.find((a) => a.id === id))
    )
  }
}
