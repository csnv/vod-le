import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IndustryDialogComponent } from './industry-dialog/industry-dialog.component';

@Component({
  selector: 'app-industry',
  templateUrl: './industry.component.html',
  styleUrls: ['./industry.component.scss']
})
export class IndustryComponent {
  constructor(
    public dialog: MatDialog
  ) {}

  /**
   * User presses on adding a new industry
   * Opens dialog
   */
  onAdd() {
    this.dialog.open(IndustryDialogComponent, {
      autoFocus: 'input',
      data: {
        type: 'add',
        title: 'New Industry'
      }
    });
  }
}