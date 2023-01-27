import { Pipe, PipeTransform } from '@angular/core';
import * as dayjs from 'dayjs';

@Pipe({ name: 'dateFormat' })
export class DateFormat implements PipeTransform {
  transform(value: Date | dayjs.Dayjs | string, dateFormat: string): any {
    if (typeof value === 'string') {
      return dayjs(value, 'YYYY-MM-dd HH:mm:ss').format(dateFormat);
    }

    return  dayjs(value).format(dateFormat);
  }
}
