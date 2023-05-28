import { TestBed } from '@angular/core/testing';

import { DeviceService } from './device.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { Device } from './device.model';


describe('DeviceService', () => {
  let service: DeviceService;
  let httpController: HttpTestingController;
  const devicesList: Device[] = [
    {
      "quantity": 12,
      "fee": 290,
      "id": 1,
      "name": "Abc",
      "additionTime": "2023-03-03 14:22:22",
      "industryId": 19
    },
    {
      "quantity": 10,
      "fee": 9,
      "name": "Def",
      "industryId": 25,
      "additionTime": "2023-05-27 20:36:50",
      "id": 4
    },
    {
      "quantity": 1,
      "fee": 12,
      "name": "Ghi",
      "industryId": 28,
      "additionTime": "2023-05-28 16:59:50",
      "id": 5
    }
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(DeviceService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an api call', () => {
    const request = httpController.expectOne({
      method: 'GET',
      url: environment.api + '/devices'
    })

    request.flush(devicesList);
  });

  it('get the same number of items', () => {
    service.getDevices().subscribe((devices) => {
      expect(devices).toEqual(devicesList);
    });
  });

  it('add a new item', () => {
    const newDevice = {
      "quantity": 12,
      "fee": 290,
      "name": "NewDevice",
      "additionTime": "2023-03-03 14:22:22",
      "industryId": 19
    }

    service.addDevice(newDevice);
    service.getDevices().subscribe((devices) => {
      const last = devices.pop();
      expect(last).toBe(newDevice);
    });
  });

  it('update an existing item', () => {
    const length = devicesList.length;
    const randomIndex = Math.floor(Math.random() * length);
    const randomitem = devicesList[randomIndex] as Device;
    const clone = {...randomitem};

    clone.name = 'Test name';
    service.updateDevice(clone);
    service.getDevices().subscribe(devices => {
      const modifiedItem = devices.find(item => item.id === clone.id) as Device;
      expect(modifiedItem).toEqual(clone);
    });
  });
  
  it('remove an existing item', () => {
    const startingLength = devicesList.length;
    service.removeDevice(devicesList[0]);
    service.getDevices().subscribe(devices => {
      expect(devices.length).toBe(startingLength - 1);
    })
  });
});
