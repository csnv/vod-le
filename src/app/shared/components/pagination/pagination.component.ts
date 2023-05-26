import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  /* Current page from parent component */
  @Input('current') current!: number;
  /* Total number of pages */
  @Input('total') total!: number;
  /* Page changed event */
  @Output('pageChanged') pageChanged = new EventEmitter<number>();

  /**
   * Creates an array of index+1 numbers until required length
   */
  get pages(): number[] {
    return Array.from({ length: this.total }, (_, index) => index + 1);
  }

  /**
   * User clicks on 'previous' button
   */
  onPreviousPage() {
    if (this.current <= 1) {
      return;
    }
    
    this.current -= 1;
    this.pageChanged.emit(this.current)
  }

  /**
   * User clicks on 'next' button
   */
  onNextPage() {
    if (this.current >= this.total) {
      return;
    }

    this.current += 1;
    this.pageChanged.emit(this.current);
  }

  /**
   * User clicks on desired page
   * @param page Clicked page
   */
  goToPage(page: number) {
    this.current = page;
    this.pageChanged.emit(this.current);
  }
}
