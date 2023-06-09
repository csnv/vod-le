import {  Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IndustryService } from '../industry.service';
import { NgForm } from '@angular/forms';
import { Industry } from '../industry.model';

export interface IndustryDialogData {
  type: 'add' | 'modify',
  title: string,
  item: Industry
}
@Component({
  selector: 'app-industry-dialog',
  templateUrl: './industry-dialog.component.html',
  styleUrls: [
    '../../../styles/dialog.scss',
    './industry-dialog.component.scss'
  ]
})
export class IndustryDialogComponent implements OnInit {
  /* Current form */
  @ViewChild('form') form!: NgForm;
  /* Industry item being modified or created */
  item!: Industry;
  
  /**
   * Create dialog and inject data
   * @param dialogRef Current dialog reference
   * @param data Dialog data, including mat dialog
   * @param industryService Industry entity
   */
  constructor(
    public dialogRef: MatDialogRef<IndustryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndustryDialogData,
    private industryService: IndustryService
  ) {}

  /**
   * Copy item data, if any
   */
  ngOnInit() {
    const item = this.data.item || {};
    this.item = { ...item };
  }

  /**
   * Close dialog and terminates component
   */
  onClose() {
    this.dialogRef.close();
  }

  /**
   * User submits form
   */
  onSubmit() {
    if (this.form.invalid)
      return;

    if (this.data.type === 'add') {
      this.industryService.addIndustry(this.item.name);
    } else {
      this.industryService.updateIndustry(this.item);
    }

    this.onClose();
  }
}
