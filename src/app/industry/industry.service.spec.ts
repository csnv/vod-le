import { TestBed } from '@angular/core/testing';

import { IndustryService } from './industry.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import api from '../../../api/db.json';
import { environment } from '../../environments/environment';
import { Industry } from './industry.model';

describe('IndustryService', () => {
  let service: IndustryService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(IndustryService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should make an api call', () => {
    const request = httpController.expectOne({
      method: 'GET',
      url: environment.api + '/industries'
    })

    request.flush(api.industries);
  });

  it('get the same number of items', () => {
    service.getIndustries().subscribe((industries) => {
      expect(industries).toEqual(api.industries);
    });
  });

  it('add a new item', () => {
    const newIndustryName = 'New Industry';

    service.addIndustry(newIndustryName);
    service.getIndustries().subscribe((industries) => {
      const last = industries.pop();
      expect(last).toBe(newIndustryName);
    });
  });

  it('update an existing item', () => {
    const length = api.industries.length;
    const randomIndex = Math.floor(Math.random() * length);
    const randomitem = api.industries[randomIndex] as Industry;
    const clone = {...randomitem};

    clone.name = 'Test name';
    service.updateIndustry(clone);
    service.getIndustries().subscribe(industries => {
      const modifiedItem = industries.find(item => item.id === clone.id) as Industry;
      expect(modifiedItem).toEqual(clone);
    });
  });
  
  it('remove an existing item', () => {
    const startingLength = api.industries.length;
    service.removeIndustry(api.industries[0]);
    service.getIndustries().subscribe(industries => {
      expect(industries.length).toBe(startingLength - 1);
    })
  });
});
