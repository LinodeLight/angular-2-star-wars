import { Injectable, Pipe, PipeTransform } from '@angular/core';
import * as _ from 'underscore';

@Pipe({
  name: 'filterByName',
  pure: false
})

@Injectable()

export class FilterByNamePipe implements PipeTransform {
  transform(items: any[], args: string): any {
    if(!items && !args) return items;

    let query = args.toLowerCase().trim();

    return items.filter(item => {
      return item.name.toLowerCase().indexOf(query) !== -1;
    });
  }
}
