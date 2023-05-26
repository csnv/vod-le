import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustryComponent } from './industry.component';
import { MatDialog } from '@angular/material/dialog';
import { Component } from '@angular/core';

/* Required stubs */
@Component({ selector: 'app-industry-list', template: ''})
class IndustryListComponent {}

@Component({ selector: 'app-header', template: ''})
class HeaderComponent {}

describe('IndustryComponent', () => {
  let component: IndustryComponent;
  let fixture: ComponentFixture<IndustryComponent>;
  const matDialogMock = {
    open: jest.fn()
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        IndustryComponent,
        IndustryListComponent,
        HeaderComponent
      ],
      providers: [{ provide: MatDialog, useValue: matDialogMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open dialog', () => {
    component.onAdd();
    expect(matDialogMock.open).toHaveBeenCalled();
  });
});
