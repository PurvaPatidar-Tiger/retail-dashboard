import { Pipe, PipeTransform } from '@angular/core';
//import * as moment from 'moment';
import { format } from 'date-fns';

@Pipe({
  name: 'localDate',
})
export class LocalDatePipe implements PipeTransform {
  transform(value: Date, args: string): string {
    if (!value || !args) {
      return '';
    }
    return format(value, args);
  }
}
