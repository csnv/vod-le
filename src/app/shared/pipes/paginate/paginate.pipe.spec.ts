import { PaginatePipe } from './paginate.pipe';

describe('PaginatePipe', () => {
  const pipe = new PaginatePipe();
  const list = [1, 2, 3, 4, 5, 6];
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('return list of 2 elements', () => {
    const slicedList = pipe.transform(list, 3, 2);
    expect(slicedList).toEqual([5, 6]);
  })
});
