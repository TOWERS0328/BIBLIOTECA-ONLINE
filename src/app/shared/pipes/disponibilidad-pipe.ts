import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'disponibilidad'
})
export class DisponibilidadPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
