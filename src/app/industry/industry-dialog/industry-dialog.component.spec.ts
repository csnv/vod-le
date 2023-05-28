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

  const beforeTest = async (dialogData: any = dialogDataMock) => {
    await TestBed.configureTestingModule({
      declarations: [ IndustryDialogComponent ],
      imports: [FormsModule],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MAT_DIALOG_DATA, useValue: dialogData },
        { provide: IndustryService, useValue: industryServiceMock }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustryDialogComponent);
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
    industryServiceMock.addIndustry.mockClear();

    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();
    
    expect(industryServiceMock.addIndustry).toHaveBeenCalled();
  })

  it('should perform modification', async () => {
    await beforeTest({
      ...dialogDataMock,
      type: 'modify'
    });
    industryServiceMock.addIndustry.mockClear();
    
    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();

    expect(industryServiceMock.updateIndustry).toHaveBeenCalled();
  });

  it('should not submit', async () => {
    await beforeTest({
      ...dialogDataMock,
      item: { name: '' }
    });
    industryServiceMock.addIndustry.mockClear();

    const submitBtn = fixture.debugElement.query(By.css("button.btn.primary"));
    submitBtn.nativeElement.click();

    expect(industryServiceMock.addIndustry).not.toBeCalled();
  })
});
