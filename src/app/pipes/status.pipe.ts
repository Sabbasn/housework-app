import { Pipe, PipeTransform } from '@angular/core';
import { Status } from 'src/models/housework/status.enum';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return `${Status[Number(value)]}`;
  }

}
