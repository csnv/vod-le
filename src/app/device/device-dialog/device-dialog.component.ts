import { Component, Inject, ViewChild } from '@angular/core';
import { DeviceService } from '../device.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';
import { IndustryService } from '../../industry/industry.service';
import { Industry } from '../../industry/industry.model';
import { Subscription } from 'rxjs';
import { format } from 'date-fns';

export interface DeviceDialogData {
  type: 'add' | 'modify',
  title: string,
  item: any
}

@Component({
  selector: 'app-device-dialog',
  templateUrl: './device-dialog.component.html',
  styleUrls: [
    '../../../styles/dialog.scss',
    './device-dialog.component.scss'
  ]
})
export class DeviceDialogComponent {
  /* Current form */
  @ViewChild('form') form!: NgForm;
  /* Device item being modified or created */
  item!: any;
  /* List of industries, required for dropdown */
  industryServiceSub!: Subscription;
  industryList!: Industry[];

  /**
   * Create dialog and inject data
   * @param dialogRef Current dialog reference
   * @param data Dialog data, including mat dialog
   * @param deviceService Device entity
   */
  constructor(
    public dialogRef: MatDialogRef<DeviceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeviceDialogData,
    private deviceService: DeviceService,
    private industryService: IndustryService
  ) {}

  /**
   * Copy item data, if any
   */
  ngOnInit() {
    this.industryServiceSub = this.industryService.getIndustries().subscribe(industries => {
      this.industryList = industries;
    });

    const item = this.data.item || {};
    this.item = {
      quantity: 1,
      fee: 0,
      ...item
    };
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

    // Fix industry id, just in case
    const item = {
      ...this.item,
      industryId: parseInt(this.item.industryId)
    };
    
    if (this.data.type === 'add') {
      const currentDate = new Date();
      item.additionTime = format(currentDate, 'yyyy-MM-dd HH:mm:ss');
      this.deviceService.addDevice(item);
    } else {
      this.deviceService.updateDevice(item);
    }

    this.onClose();
  }
}
