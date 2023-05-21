import { Injectable } from '@angular/core';
import { Alumno } from '../models/index';
import { BehaviorSubject, Observable, map, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private estudiantes$ = new BehaviorSubject<Alumno[]>([
    {
      id: 1,
      nombre: 'Paulino',
      apellido: 'Canto',
      email: 'canto@mail.com',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: ''
    },
    {
      id: 2,
      nombre: 'Anna',
      apellido: 'San-Jose',
      email: ' san-Jose@mail.com',
      pais: 'Uruguay',
      fecha_registro: new Date(),
      acciones: ''
    },
    {
      id: 3,
      nombre: 'Ramiro',
      apellido: 'Espada',
      email: 'sspada@mail.com',
      pais: 'Brazil',
      fecha_registro: new Date(),
      acciones: ''
    },
    {
      id: 4,
      nombre: 'Pamela',
      apellido: 'Rueda',
      email: 'rueda@mail.com',
      pais: 'Chile',
      fecha_registro: new Date(),
      acciones: ''
    },
    {
      id: 5,
      nombre: 'Martha',
      apellido: 'Ahmed',
      email: 'marthmed@mail.com',
      pais: 'Peru',
      fecha_registro: new Date(),
      acciones: ''
    },
    {
      id: 6,
      nombre: 'Mireia',
      apellido: 'Santamaria',
      email: 'mirantamaria@mail.com',
      pais: 'Argentina',
      fecha_registro: new Date(),
      acciones: ''
    },
  ])

  constructor() { }

  obtenerAlumnos(): Observable<Alumno[]> {
    return this.estudiantes$.asObservable();
  }

  obtenerAlumnoPorId(id: number): Observable<Alumno | undefined>{
    return this.estudiantes$.asObservable()
    .pipe(
      map((alumnos) => alumnos.find((a) => a.id === id))
    )
  }

}
