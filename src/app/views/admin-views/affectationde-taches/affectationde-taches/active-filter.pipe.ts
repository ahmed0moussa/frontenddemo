// active-filter.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterActive'
})
export class ActiveFilterPipe implements PipeTransform {
  transform(items: any[] | undefined): any[] {
    if (!items) {
      return [];
    }
    return items.filter(item => item.active);
  }
}
