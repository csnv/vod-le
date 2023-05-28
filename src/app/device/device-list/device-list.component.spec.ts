import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { MatDialog } from '@angular/material/dialog';
import { IndustryService } from '../../industry/industry.service';
import { DeviceService } from '../device.service';
import { PaginatePipe } from '../../shared/pipes/paginate/paginate.pipe';
import { SortPipe } from '../../shared/pipes/sort/sort.pipe';
import { IdentifyPipe } from '../../shared/pipes/identify/identify.pipe';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  const matDialogMock = {
    open: jest.fn()
  };

  const devicesList = [
    {
      "quantity": 12,
      "fee": 290,
      "id": 1,
      "name": "Abc",
      "additionTime": "2023-03-03 14:22:22",
      "industryId": 1
    },
    {
      "quantity": 12,
      "fee": 290,
      "id": 1,
      "name": "Def",
      "additionTime": "2023-03-03 14:22:22",
      "industryId": 2
    }
  ]
  const deviceServiceMock = {
    queryIndustry: {
      next: jest.fn(),
      subscribe: (fn: Function) => fn(2),
      unsubscribe: jest.fn()
    },
    getDevices: () => ({
      subscribe: function(fn: Function) { fn(devicesList); return this },
      unsubscribe: jest.fn()
    }),
    removeDevice: jest.fn()
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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        DeviceListComponent,
        PaginatePipe,
        SortPipe,
        IdentifyPipe,
        PaginationComponent
      ],
      providers: [
        { provide: DeviceService, useValue: deviceServiceMock },
        { provide: IndustryService, useValue: industryServiceMock },
        { provide: MatDialog, useValue: matDialogMock },
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;

    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('update query industry id', () => {
    const industryId = 2;
    expect(component.queryIndustryId).toBe(industryId);
  });

  it('update device list', () => {
    expect(component.list).toEqual(devicesList);
  })

  it('update industries list', () => {
    expect(component.industriesList).toEqual(industriesList);
  })

  it('filter list', () => {
    component.list = [...devicesList];
    component.queryIndustryId = undefined;
    component.searchValue = 'a';
    component.filterList();
    
    const filterpipe = new FilterPipe();
    const filteredData = filterpipe.transform(devicesList, component.searchValue, 'name');

    expect(component.displayList).toEqual(filteredData);
  });

  it('run modification dialog', () => {
    component.onModify(devicesList[0]);
    expect(component.dialog).toBeTruthy();
  });

  it('delete an industry', () => {
    component.onDelete(devicesList[0]);
    expect(deviceServiceMock.removeDevice).toHaveBeenCalledWith(devicesList[0]);
  });
});
