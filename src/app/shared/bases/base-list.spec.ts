import { FilterPipe } from "../pipes/filter/filter.pipe";
import { BaseList } from "./base-list";

describe('BaseList', () => {
  const baseList = new BaseList();
  const list = [
    { name: 'Zack', age: 12 },
    { name: 'John', age: 40 },
    { name: 'Alba', age: 12 },
  ];

  beforeEach(() => {
    baseList.list = list;
    baseList.filterList();
  });

  it('change header sort field', () => {
    baseList.sortingField = 'name';
    baseList.sortingDir = 1;

    baseList.onHeaderToggle('name');
    expect(baseList.sortingDir).toBe(-1);
  });

  it('change header sort direction', () => {
    baseList.sortingField = 'id';
    baseList.sortingDir = 1;

    baseList.onHeaderToggle('name');
    expect(baseList.sortingField).toBe('name');
  });

  it('not filter list', () => {
    baseList.list = [...list];
    baseList.searchValue = '';
    baseList.filterList();
    expect(baseList.displayList).toEqual(list);
  });

  it('should filter list', () => {
    baseList.list = [...list];
    baseList.searchValue = 'a';
    baseList.filterList();
    
    const filterpipe = new FilterPipe();
    const filteredData = filterpipe.transform(list, baseList.searchValue, 'name');

    expect(baseList.displayList).toEqual(filteredData);
  });

  it('update pagination data', () => {
    baseList.list = [...list];
    baseList.itemsPerPage = 2;
    baseList.searchValue = '';
    const total = Math.ceil(list.length / baseList.itemsPerPage)

    baseList.filterList(); // Should call pagination
    expect(baseList.totalPages).toBe(total);
  });

  it('restrict current page', () => {
    baseList.list = [...list];
    baseList.currentPage = 100;
    baseList.itemsPerPage = 2;
    baseList.searchValue = '';
    const total = Math.ceil(list.length / baseList.itemsPerPage)

    baseList.filterList(); // Should call pagination
    expect(baseList.currentPage).toBe(total);
  });

  it('update current page', () => {
    const page = 2;
    baseList.onPaginationChanged(page);
    expect(baseList.currentPage).toBe(page);
  });
});