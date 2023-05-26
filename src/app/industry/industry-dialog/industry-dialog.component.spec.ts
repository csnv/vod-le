import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { IndustryDialogComponent } from './industry-dialog.component';
import { IndustryService } from '../industry.service';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

describe('IndustryDialogComponent', () => {
  let component: IndustryDialogComponent;
  let fixture: ComponentFixture<IndustryDialogComponent>;
  const matDialogRefMock = {
    close: jest.fn(),
  };
  const dialogDataMock = {
    type: 'add',
    item: {
      name: 'Example'
    }
  };
  const industryServiceMock = {
    addIndustry: jest.fn(),
    updateIndustry: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryDialogComponent ],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogDataMock },
        { provide: IndustryService, useValue: industryServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should perform addition', () => {
    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();
    expect(industryServiceMock.addIndustry).toHaveBeenCalled();
  })

  it('should perform modification', () => {
    component.data.type = 'modify';
    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();
    expect(industryServiceMock.addIndustry).toHaveBeenCalled();
  })
});
