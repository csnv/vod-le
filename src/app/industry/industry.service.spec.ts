import { TestBed } from '@angular/core/testing';

import { IndustryService } from './industry.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { environment } from '../../environments/environment';
import { Industry } from './industry.model';


describe('IndustryService', () => {
  let service: IndustryService;
  let httpController: HttpTestingController;
  const industriesList: Industry[] = [
    { id: 0, name: 'Abc 1'},
    { id: 1, name: 'Def 6'},
    { id: 2, name: 'Hij 7'},
    { id: 3, name: 'Klm 8'},
    { id: 4, name: 'Nop 9'},
    { id: 5, name: 'Qrs 10'},
  ];

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

    request.flush(industriesList);
  });

  it('get the same number of items', () => {
    service.getIndustries().subscribe((industries) => {
      expect(industries).toEqual(industriesList);
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
    const length = industriesList.length;
    const randomIndex = Math.floor(Math.random() * length);
    const randomitem = industriesList[randomIndex] as Industry;
    const clone = {...randomitem};

    clone.name = 'Test name';
    service.updateIndustry(clone);
    service.getIndustries().subscribe(industries => {
      const modifiedItem = industries.find(item => item.id === clone.id) as Industry;
      expect(modifiedItem).toEqual(clone);
    });
  });
  
  it('remove an existing item', () => {
    const startingLength = industriesList.length;
    service.removeIndustry(industriesList[0]);
    service.getIndustries().subscribe(industries => {
      expect(industries.length).toBe(startingLength - 1);
    })
  });
});
