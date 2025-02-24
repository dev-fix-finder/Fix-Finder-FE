import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireTradesmenComponent } from './hire-tradesmen.component';

describe('HireTradesmenComponent', () => {
  let component: HireTradesmenComponent;
  let fixture: ComponentFixture<HireTradesmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireTradesmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireTradesmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
