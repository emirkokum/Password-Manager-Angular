import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterPipe',
  standalone: true
})
export class FilterPipePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
