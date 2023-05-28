import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'identify'
})
export class IdentifyPipe implements PipeTransform {

  /**
   * Looks up object of ID in list and returns a different value of the same object
   * @param sourceValue Identification value
   * @param list Data list
   * @param sourceKey Key of the identification value
   * @param outputKey Key of the desired output
   */
  transform(sourceValue: any, list: any, sourceKey: string, outputKey: string): any {
    if (sourceValue === undefined || !Array.isArray(list) || list.length === 0) {
      return '';
    }
    
    const value = sourceValue.toString();
    const item = list.find((_item: any) => _item[sourceKey]?.toString() === value);
    
    return item ? item[outputKey] : '';
  }

}
