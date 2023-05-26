import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationComponent } from './pagination.component';
import { By } from '@angular/platform-browser';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.current = 1;
    component.total = 12;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should list items', () => {
    const itemsLength = component.total + 2;
    const items = fixture.debugElement.queryAll(By.css(".pagination .item"));

    expect(items.length).toBe(itemsLength);
  });

  it('call pageChanged on previous', () => {
    jest.spyOn(component.pageChanged, 'emit');

    component.current = 3;
    component.total = 12;
    component.onPreviousPage();

    expect(component.pageChanged.emit).toHaveBeenCalledWith(2);
  });

  it('do not call pageChanged on previous', () => {
    jest.spyOn(component.pageChanged, 'emit');

    component.current = 1;
    component.total = 12;
    component.onPreviousPage();

    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('call pageChanged on next', () => {
    
    jest.spyOn(component.pageChanged, 'emit');

    component.current = 3;
    component.total = 12;
    component.onNextPage();

    expect(component.pageChanged.emit).toHaveBeenCalledWith(4);
  });

  it('do not call pageChanged on next', () => {
    
    jest.spyOn(component.pageChanged, 'emit');

    component.current = 12;
    component.total = 12;
    component.onNextPage();

    expect(component.pageChanged.emit).not.toHaveBeenCalled();
  });

  it('call pageChanged on page', () => {
    
    jest.spyOn(component.pageChanged, 'emit');

    component.current = 3;
    component.goToPage(4);

    expect(component.pageChanged.emit).toHaveBeenCalledWith(4);
  });
});
