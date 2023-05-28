import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { DeviceDialogComponent } from './device-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { DeviceService } from '../device.service';
import { IndustryService } from '../../industry/industry.service';
import { SortPipe } from '../../shared/pipes/sort/sort.pipe';
import { By } from '@angular/platform-browser';

describe('DeviceDialogComponent', () => {
  let component: DeviceDialogComponent;
  let fixture: ComponentFixture<DeviceDialogComponent>;

  const matDialogRefMock = {
    close: jest.fn(),
  };

  const dialogDataMock = {
    type: 'add',
    item: {
      name: 'Example',
      additionTime: '2023-03-03 18:18:18',
      quantity: 2,
      fee: 100.20,
      industryId: 0
    }
  };

  const deviceServiceMock = {
    addDevice: jest.fn(),
    updateDevice: jest.fn()
  };

  const industriesList = [
    { id: 0, name: "Abc" }
  ];
  const industryServiceMock = {
    getIndustries: () => ({
      subscribe: function(fn: Function) { fn(industriesList); return this },
      unsubscribe: jest.fn()
    })
  };

  const beforeTest = async (dialogData: any = dialogDataMock) => {
    await TestBed.configureTestingModule({
      declarations: [
        DeviceDialogComponent,
        SortPipe
      ],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: DeviceService, useValue: deviceServiceMock },
        { provide: IndustryService, useValue: industryServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceDialogComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  };

  it('should create', async () => {
    await beforeTest();
    expect(component).toBeTruthy();
  });

  it('should perform addition', async () => {
    await beforeTest();
    deviceServiceMock.addDevice.mockClear();

    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();
    
    expect(deviceServiceMock.addDevice).toHaveBeenCalled();
  })

  it('should perform modification', async () => {
    await beforeTest({
      ...dialogDataMock,
      type: 'modify'
    });
    
    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();

    expect(deviceServiceMock.updateDevice).toHaveBeenCalled();
  });

  it('should not submit', async () => {
    await beforeTest({
      ...dialogDataMock,
      item: { }
    });
    deviceServiceMock.addDevice.mockClear();

    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();

    expect(deviceServiceMock.addDevice).not.toBeCalled();
  });

  it('should have industries list', async () => {
    await beforeTest();
    component.ngOnInit();
    await fixture.whenStable();
    expect(component.industryList).toEqual(industriesList);
  })
});

