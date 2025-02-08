import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageFeatureHighlightsComponent } from './landing-page-feature-highlights.component';

describe('LandingPageFeatureHighlightsComponent', () => {
  let component: LandingPageFeatureHighlightsComponent;
  let fixture: ComponentFixture<LandingPageFeatureHighlightsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageFeatureHighlightsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageFeatureHighlightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
