import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {
  /**
   * Returns a copy of an array of objects ordered by key
   * @param list Original array of objects
   * @param sortKey Object key used for sorting
   * @param sortDir Sort direction
   * @returns Ordered copy of array
   */
  transform(list: any[], sortKey: string, sortDir: number = 1): any[] {
    if (!list)
      return [];

    const arr = [...list];

    arr.sort((a: any, b: any) => {
      const valueA = a[sortKey];
      const valueB = b[sortKey];

      if (typeof valueA === 'string') {
        return valueA.localeCompare(valueB) * sortDir;
      }

      return (valueA - valueB) * sortDir;
    });

    return arr;
  }

}
