import { Alumno } from "src/app/pages/alumnos/componentes/models";
import { Curso } from "src/app/pages/cursos/Componentes/models";

export interface Inscripciones {
  id: number;
  alumnoId: number;
  cursoId: number;
  fecha_inscripcion: string;
  alumno?: Alumno;
  curso?: Curso;
}
