import { FilterPipe } from "../pipes/filter/filter.pipe";

export class BaseList<T> {
  /* Template variables */
  list!: T[];
  displayList!: T[];

  /* Searching variables */
  searchValue = "";
  filterPipe = new FilterPipe();

  /* Sorting values: field and direction */
  sortingField = '';
  sortingDir = 1;

  /* Pagination */
  currentPage = 1;
  totalPages = 0;
  itemsPerPage = 10;

  /**
   * Filter original industry list by query
   */
  filterList() {
    if (this.searchValue === "") {
      this.displayList = [ ...this.list ];
    } else {
      this.displayList = this.filterPipe.transform(this.list, this.searchValue, 'name');
    }

    this.updatePagination();
  }

  /**
   * Update pagination related variables (mostly after updating displayIndustries)
   */
  updatePagination() {
    const length = this.displayList.length;
    this.totalPages = Math.ceil(length / this.itemsPerPage);

    if (this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages;
    }

    if (this.currentPage === 0) {
      this.currentPage = 1;
    }
  }

  /**
   * User selected another page
   * @param page Selected page
   */
  onPaginationChanged(page: number) {
    this.currentPage = page;
  }

  /**
   * User clicks on a table header label
   * Changes the field used by sorting or toggles the direction of sorting order
   * @param key Table field
   */
  onHeaderToggle(key: string) {
    // User clicks on already ordered field, just toggle the direction
    if (this.sortingField === key) {
      this.sortingDir *= -1;
      return;
    }

    // Otherwise order by new field and reset direction
    this.sortingField = key;
    this.sortingDir = 1;
  }
}