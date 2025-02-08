import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageContextComponent } from './landing-page-context.component';

describe('LandingPageContextComponent', () => {
  let component: LandingPageContextComponent;
  let fixture: ComponentFixture<LandingPageContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
