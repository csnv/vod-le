import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  /**
   * Filter a list of objects by key
   * @param list List of items
   * @param searchValue Filtering string
   * @param key Property name
   * @returns filtered list
   */
  transform(list: any[], searchValue: string, key: string): any[] {
    const search = searchValue.toLowerCase();

    return list.filter((item: any) => {
      let value = item[key] as any;

      if (typeof value !== 'string') {
        value = (value as object).toString()
      }

      return value.toLowerCase().includes(search);
    });
  }

}
