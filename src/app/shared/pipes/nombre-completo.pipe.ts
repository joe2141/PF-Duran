import { Pipe, PipeTransform } from '@angular/core';
import { Estudiante } from 'src/app/pages/tablas/tablas.component';

@Pipe({
  name: 'nombreCompleto'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(value: Estudiante, ...args: unknown[]): unknown {

    const newValue = `${value.nombre} ${value.apellido}`;

    switch (args[0]) {
      case 'mayusculas':
        return newValue.toUpperCase();
        case 'minusculas':
          return newValue.toLocaleLowerCase();
      default:
        return newValue;
    }
  }

}
