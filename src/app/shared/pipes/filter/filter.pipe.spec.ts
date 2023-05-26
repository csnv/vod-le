import { FilterPipe } from './filter.pipe';

describe('FilterPipe', () => {
  const pipe = new FilterPipe();
  const list = [
    { name: 'Zack', age: 12 },
    { name: 'John', age: 40 },
    { name: 'Alba', age: 12 },
  ];
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('filter by name', () => {
    const searchValue = 'Za';
    const filteredList = pipe.transform(list, searchValue, 'name');
    expect(filteredList.length).toBe(1);
  });

  it('filter by age', () => {
    const searchValue = '12';
    const filteredList = pipe.transform(list, searchValue, 'age');
    expect(filteredList.length).toBe(2);
  })
});
