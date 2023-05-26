import { SortPipe } from './sort.pipe';

describe('SortPipe', () => {
  const pipe = new SortPipe();
  const list = [
    { name: 'Zack', age: 12 },
    { name: 'John', age: 40 },
    { name: 'Alba', age: 16 },
  ];

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('expect empty lists', () => {
    // @ts-expect-error
    const result = pipe.transform(undefined, 'name' , 1);
    expect(result).toEqual([]);
  });

  it('sort ascending order', () => {
    const result = pipe.transform(list, 'name', 1);
    expect(result[0].name).toEqual('Alba');
  })

  it('sort descending order', () => {
    const result = pipe.transform(list, 'age', -1);
    expect(result[0].age).toEqual(40);
  });
});
