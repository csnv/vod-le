import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';

class DummyComponent {}

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      imports: [ RouterTestingModule.withRoutes([ { path: 'industries', component: DummyComponent } ]) ]
    })
    .compileComponents();
    
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render banner title', () => {
    const expectedTitle = 'VODLE';

    const bannerTitle = fixture.debugElement.query(By.css('header > .bar > .banner > a > .title'));

    expect(bannerTitle.nativeElement.textContent).toEqual(expectedTitle);
  });

  it('should trigger navigation', fakeAsync(() => {
    const industriesLink = fixture.debugElement.query(By.css('nav > a:first-child'));

    industriesLink.nativeElement.click();
    tick(5);
    expect(location.path()).toEqual('/industries');
    
  }));
});
