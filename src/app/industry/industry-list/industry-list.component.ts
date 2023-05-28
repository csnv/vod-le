import { Component, OnDestroy, OnInit } from '@angular/core';
import { Industry } from '../industry.model';
import { IndustryService } from '../industry.service';
import { MatDialog } from '@angular/material/dialog';
import { IndustryDialogComponent } from '../industry-dialog/industry-dialog.component';
import { Subscription } from 'rxjs';
import { BaseList } from '../../shared/bases/base-list';
import { Router } from '@angular/router';

@Component({
  selector: 'app-industry-list',
  templateUrl: './industry-list.component.html',
  styleUrls: [
    '../../../styles/table.scss',
    './industry-list.component.scss'
  ]
})
export class IndustryListComponent extends BaseList<Industry> implements OnInit, OnDestroy {
  /* Industry service subscription */
  industryServiceSub!: Subscription;
  /* Overriden settings */
  override sortingField: string = 'id';

  constructor(
    private industryService: IndustryService,
    public dialog: MatDialog,
    private router: Router
  ) {
    super();
  }

  /**
   * Subscribe to service (ngrx style)
   */
  ngOnInit(): void {
    this.industryServiceSub = this.industryService.getIndustries().subscribe(industries => {
      this.list = industries;
      this.filterList();
    });
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
   * Nav to devices list and filter by industry
   * @param industryId Selected industry Id
   */
  goToRelatedDevices(industryId: number) {
    this.router.navigate(['/devices'], {
      queryParams: {
        industryId
      }
    });
  }

  /**
   * Component is being destroyed
   */
  ngOnDestroy() {
    this.industryServiceSub.unsubscribe();
  }
}
