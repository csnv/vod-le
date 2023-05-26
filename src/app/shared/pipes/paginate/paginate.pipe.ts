import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paginate'
})
export class PaginatePipe implements PipeTransform {

  /**
   * Slices list taking into account the current displaying page and the amount of items per page
   * @param list Original list
   * @param current Current page
   * @param itemsPerPage Number of items per page
   * @returns Sliced list
   */
  transform(list: any[], current: number, itemsPerPage: number): any[] {
    const start = (current -1) * itemsPerPage;
    const end = start + itemsPerPage;

    return list.slice(start, end);
  }

}
