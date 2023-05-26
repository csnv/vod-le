import {  Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IndustryService } from '../industry.service';
import { NgForm } from '@angular/forms';

export interface IndustryDialogData {
  type: 'add' | 'modify',
  title: string,
  item: any
}
@Component({
  selector: 'app-industry-dialog',
  templateUrl: './industry-dialog.component.html',
  styleUrls: [
    '../../../styles/dialog.scss',
    './industry-dialog.component.scss'
  ]
})
export class IndustryDialogComponent {
  /* Current form */
  @ViewChild('form') form!: NgForm;
  /* Name input */
  @ViewChild('nameInput') nameInput!: ElementRef;
  /* Industry item being modified or created */
  item: any;
  
  /**
   * Create dialog and inject data
   * @param dialogRef Current dialog reference
   * @param data Dialog data, including mat dialog
   * @param industryService 
   */
  constructor(
    public dialogRef: MatDialogRef<IndustryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IndustryDialogData,
    private industryService: IndustryService
  ) {
    const item = data.item || {};
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
