import { Component, OnDestroy, OnInit } from '@angular/core';
import { Industry } from '../industry.model';
import { IndustryService } from '../industry.service';
import { MatDialog } from '@angular/material/dialog';
import { IndustryDialogComponent } from '../industry-dialog/industry-dialog.component';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: [
    '../../../styles/table.scss',
    './industry-list.component.scss'
  ]
})
export class IndustryListComponent implements OnInit, OnDestroy {
  /* List of industries */
  industries: Industry[] = [];
  /* List of industries for display */
  displayIndustries: Industry[] = [];
  /* Industry service subscription */
  industryServiceSub!: Subscription;

  /* Searching variables */
  searchValue = "";
  filterPipe = new FilterPipe();

  /* Sorting values: field and direction */
  sortingField = 'id';
  sortingDir = 1;

  /* Pagination */
  currentPage = 1;
  totalPages = 0;
  ITEMS_PER_PAGE = 10;

  constructor(
    private industryService: IndustryService,
    public dialog: MatDialog
  ) {}

  /**
   * Subscribe to service (ngrx style)
   */
  ngOnInit(): void {
    this.industryServiceSub = this.industryService.getIndustries().subscribe(industries => {
      this.industries = industries;
      this.filterList();
    });
  }

  /**
   * Filter original industry list by query
   */
  filterList() {
    if (this.searchValue === "") {
      this.displayIndustries = [ ...this.industries ];
    } else {
      this.displayIndustries = this.filterPipe.transform(this.industries, this.searchValue, 'name');
    }

    this.updatePagination();
  }

  /**
   * Update pagination related variables (mostly after updating displayIndustries)
   */
  updatePagination() {
    const length = this.displayIndustries.length;
    this.totalPages = Math.ceil(length / this.ITEMS_PER_PAGE);

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
   * User presses on modifying an industry item
   * Opens dialog for modification
   * @param item Pressed item
   */
  onModify(item: Industry) {
    this.dialog.open(IndustryDialogComponent, {
      autoFocus: 'input',
      data: {
        type: 'modify',
        title: 'Modifying ' + item.name,
        item: item
      }
    });
  }

  /**
   * User presses on deleting an industry item
   * Requests service for deletion
   * @param item Pressed item
   */
  onDelete(item: Industry) {
    this.industryService.removeIndustry(item);
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

  /**
   * Component is being destroyed
   */
  ngOnDestroy() {
    this.industryServiceSub.unsubscribe();
  }
}
