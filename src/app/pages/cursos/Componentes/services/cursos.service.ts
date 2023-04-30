import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Curso } from '../models';

const CURSOS_MOCKS: Curso[] = [
{
  id: 1,
  nombre: 'Angula',
  fecha_inicio: new Date(),
  fecha_fin: new Date()
},
{
  id: 2,
  nombre: 'React',
  fecha_inicio: new Date(),
  fecha_fin: new Date()
},
{
  id: 3,
  nombre: 'Android',
  fecha_inicio: new Date(),
  fecha_fin: new Date()
},
{
  id: 4,
  nombre: 'Como Preparar un Mate por Josue Baez',
  fecha_inicio: new Date(),
  fecha_fin: new Date()
},
]



@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private cursos$ = new BehaviorSubject<Curso[]>([]);

  constructor() { }


obtenerCursos(): Observable<Curso[]> {
  this.cursos$.next(CURSOS_MOCKS);
  return this.cursos$.asObservable();
}




}
