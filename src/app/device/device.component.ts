import { Component, OnInit } from '@angular/core';
import { DeviceDialogComponent } from './device-dialog/device-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { IndustryService } from '../industry/industry.service';
import { Industry } from '../industry/industry.model';
import { Subscription } from 'rxjs';
import { DeviceService } from './device.service';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {
  /* Query param industry */
  queryIndustrySub!: Subscription;
  queryIndustryId: number | undefined;
  /* Industries list */
  industriesList!: Industry[];
  industryServiceSub!: Subscription;

  constructor(
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private industryService: IndustryService,
    private deviceService: DeviceService
  ) {}

  /**
   * 
   */
  ngOnInit() {
    // Retrieve industry id from url and propagate to subscription
    this.activatedRoute.queryParams.subscribe(params => {
      const industryId = params.industryId ? parseInt(params.industryId) : undefined;
      this.deviceService.queryIndustry.next(industryId);
    });
    // Retrieve industry id from subscription (displays banner)
    this.queryIndustrySub = this.deviceService.queryIndustry.subscribe(industryId => {
      this.queryIndustryId = industryId;
    })
    // Retrieve industry list to be able to convert id to name
    this.industryServiceSub = this.industryService.getIndustries().subscribe(industries => {
      this.industriesList = industries;
    })
  }

  /**
   * Resets industry id query parameter
   */
  resetQueryFilter() {
    this.router.navigate([], {
      queryParams: {}
    });
  }

  /**
   * User presses on adding a new industry
   * Opens dialog
   */
  onAdd() {
    this.dialog.open(DeviceDialogComponent, {
      autoFocus: 'input',
      data: {
        type: 'add',
        title: 'New Device'
      }
    });
  }

  /**
   * Component is being destroyed
   */
  onDelete() {
    this.queryIndustrySub.unsubscribe();
    console.log(this.industryServiceSub)
    this.industryServiceSub.unsubscribe();
  }
}
