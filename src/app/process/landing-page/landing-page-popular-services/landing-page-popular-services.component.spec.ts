import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPagePopularServicesComponent } from './landing-page-popular-services.component';

describe('LandingPagePopularServicesComponent', () => {
  let component: LandingPagePopularServicesComponent;
  let fixture: ComponentFixture<LandingPagePopularServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPagePopularServicesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPagePopularServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
