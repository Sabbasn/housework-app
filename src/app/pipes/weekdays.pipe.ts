import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'weekdays',
  standalone: true
})
export class WeekdaysPipe implements PipeTransform {

  transform(value: string[], ...args: unknown[]): unknown {
    
    return value;
  }

}
