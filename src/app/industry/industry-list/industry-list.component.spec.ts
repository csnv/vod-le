import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryListComponent } from './industry-list.component';
import { IndustryService } from '../industry.service';
import { MatDialog } from '@angular/material/dialog';
import { PaginatePipe } from '../../shared/pipes/paginate/paginate.pipe';
import { FilterPipe } from '../../shared/pipes/filter/filter.pipe';
import { SortPipe } from '../../shared/pipes/sort/sort.pipe';
import { of } from 'rxjs';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { Industry } from '../industry.model';
import api from '../../../../api/db.json';
describe('IndustryListComponent', () => {
  let component: IndustryListComponent;
  let fixture: ComponentFixture<IndustryListComponent>;
  const industriesList: Industry[] = [
    { id: 0, name: 'Abc 1'},
    { id: 1, name: 'Def 6'},
    { id: 2, name: 'Hij 7'},
    { id: 3, name: 'Klm 8'},
    { id: 4, name: 'Nop 9'},
    { id: 5, name: 'Qrs 10'},
  ];

  const industryServiceMock = {
    getIndustries: () => of(industriesList),
    removeIndustry: jest.fn()
  };

  const matDialogMock = {
    open: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndustryListComponent,
        PaginatePipe,
        SortPipe,
        PaginationComponent
      ],
      providers: [
        { provide: IndustryService, useValue: industryServiceMock },
        { provide: MatDialog, useValue: matDialogMock }
      ],
      imports: [
        FormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('retrieve industries', () => {
    jest.spyOn(industryServiceMock, 'getIndustries').mockReturnValue(of(industriesList));
    component.ngOnInit();
    expect(component.list).toEqual(industriesList);
  });

  it('run modification dialog', () => {
    component.onModify(industriesList[0]);
    expect(component.dialog).toBeTruthy();
  });

  it('delete an industry', () => {
    component.onDelete(industriesList[0]);
    expect(industryServiceMock.removeIndustry).toHaveBeenCalledWith(industriesList[0]);
  });
});
