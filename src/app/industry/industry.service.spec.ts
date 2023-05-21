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

  it('should return the same number of items', () => {
    service.getIndustries().subscribe((industries) => {
      expect(industries).toEqual(api.industries);
    });
  });

  it('should add a new item', () => {
    const newItem: Industry = {
      id: 999,
      name: 'New Industry'
    };

    service.addIndustry(newItem);
    service.getIndustries().subscribe((industries) => {
      const last = industries.pop();
      expect(last).toBe(newItem);
    });
  });

  it('should update an existing item', () => {
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
});
