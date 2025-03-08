import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageMainSliderComponent } from './landing-page-main-slider.component';

describe('LandingPageMainSliderComponent', () => {
  let component: LandingPageMainSliderComponent;
  let fixture: ComponentFixture<LandingPageMainSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageMainSliderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageMainSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
