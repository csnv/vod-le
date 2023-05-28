import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';

import { DeviceComponent } from './device.component';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { DeviceService } from './device.service';
import { IndustryService } from '../industry/industry.service';
import { IdentifyPipe } from '../shared/pipes/identify/identify.pipe';

/* Required stubs */
@Component({ selector: 'app-device-list', template: ''})
class DeviceListComponent {}

@Component({ selector: 'app-header', template: ''})
class HeaderComponent {}

describe('DeviceComponent', () => {
  let component: DeviceComponent;
  let fixture: ComponentFixture<DeviceComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;

  const matDialogMock = {
    open: jest.fn()
  };
  
  const deviceServiceMock = {
    queryIndustry: {
      next: jest.fn(),
      subscribe: function (fn: Function) { fn(2); return this },
      unsubscribe: jest.fn()
    }
  };
  
  const industriesList = [
    { id: 0, name: "Abc" }
  ];
  const industryServiceMock = {
    getIndustries: () => ({
      subscribe: function (fn: Function) { fn(industriesList); return this; },
      unsubscribe: jest.fn()
    })
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DeviceComponent,
        HeaderComponent,
        DeviceListComponent,
        IdentifyPipe
      ],
      providers: [
        { provide: MatDialog, useValue: matDialogMock },
        { provide: DeviceService, useValue: deviceServiceMock },
        { provide: IndustryService, useValue: industryServiceMock }
      ],
      imports: [
        RouterTestingModule.withRoutes([ { path: 'industries', component: DeviceComponent } ])
      ]
    })
    .compileComponents();

    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);

    fixture = TestBed.createComponent(DeviceComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('subscribe to activatedRoute', () => {
    jest.spyOn(activatedRoute.queryParams, 'subscribe');
    component.ngOnInit();
    expect(activatedRoute.queryParams.subscribe).toHaveBeenCalled();
  });

  it('update query industry id', () => {
    component.ngOnInit();
    const industryId = 2;
    expect(component.queryIndustryId).toBe(industryId);
  });

  it('update industries list', () => {
    component.ngOnInit();
    expect(component.industriesList).toEqual(industriesList);
  })

  it('open dialog', () => {
    component.onAdd();
    expect(matDialogMock.open).toHaveBeenCalled();
  });

  it('reset filter', () => {
    jest.spyOn(router, 'navigate');
    component.resetQueryFilter();
    expect(router.navigate).toHaveBeenCalledWith([], { queryParams: {} });
  });

  it('unsubscribe from query industry id', () => {
    component.ngOnInit();
    component.onDelete();
    expect(deviceServiceMock.queryIndustry.unsubscribe).toHaveBeenCalled();
  })

  it('unsubscribe from industries', fakeAsync(() => {
    component.ngOnInit();
    jest.spyOn(component.industryServiceSub, 'unsubscribe');
    
    component.onDelete();
    expect(component.industryServiceSub.unsubscribe).toHaveBeenCalled();
  }))
});
