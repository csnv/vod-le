import { Component, Input, OnInit } from '@angular/core';
import { BaseList } from '../../shared/bases/base-list';
import { Device } from '../device.model';
import { DeviceService } from '../device.service';
import { Subscription } from 'rxjs';
import { Industry } from '../../industry/industry.model';
import { IndustryService } from '../../industry/industry.service';
import { DeviceDialogComponent } from '../device-dialog/device-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-device-list',
  templateUrl: './device-list.component.html',
  styleUrls: [
    '../../../styles/table.scss',
    './device-list.component.scss'
  ]
})
export class DeviceListComponent extends BaseList<Device> implements OnInit {
  /* Device service subscription */
  deviceServiceSub!: Subscription;
  /* Industries service subscription */
  industriesServiceSub!: Subscription;
  industriesList!: Industry[];
  /* Query industry id */
  queryIndustrySub!: Subscription;
  queryIndustryId: number | undefined;
  
  /* Overriden settings */
  override sortingField: string = 'id';

  constructor(
    private deviceService: DeviceService,
    private industryService: IndustryService,
    public dialog: MatDialog
  ) {
    super();
  }

  /**
   * Subscribe to service (ngrx style)
   */
  ngOnInit() {
    // Industry query sub
    this.queryIndustrySub = this.deviceService.queryIndustry.subscribe(industryId => {
      this.queryIndustryId = industryId;
      this.filterList();
    });
    // List of devices
    this.deviceServiceSub = this.deviceService.getDevices().subscribe(devices => {
      this.list = devices;
      this.filterList();
    });

    // Industries are required to translate industryId
    this.industriesServiceSub = this.industryService.getIndustries().subscribe(industries => {
      this.industriesList = industries;
    });
  }

  /**
   * Filter list by search query AND industry query, if any
   */
  override filterList() {
    if (!Array.isArray(this.list)) {
      return;
    }
    
    let list = [ ...this.list ];
    
    if (this.queryIndustryId !== undefined) {
      list = list.filter((device: Device) => device.industryId === this.queryIndustryId);
    }

    if (this.searchValue !== "") {
      list = this.filterPipe.transform(list, this.searchValue, 'name');
    }

    this.displayList = list;
    this.updatePagination();
  }

  /**
   * User presses on modifying a device item
   * Opens dialog for modification
   * @param item Pressed item
   */
  onModify(item: Device) {
    this.dialog.open(DeviceDialogComponent, {
      autoFocus: 'input',
      data: {
        type: 'modify',
        title: 'Modifying ' + item.name,
        item: item
      }
    });
  }

  /**
   * User presses on deleting a device item
   * Requests service for deletion
   * @param item Pressed item
   */
  onDelete(item: Device) {
    this.deviceService.removeDevice(item);
  }

  /**
   * Component is being destroyed
   */
  ngOnDestroy() {
    this.deviceServiceSub.unsubscribe();
    this.industriesServiceSub.unsubscribe();
  }
}
