import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradePersonVerificationComponent } from './trade-person-verification.component';

describe('TradePersonVerificationComponent', () => {
  let component: TradePersonVerificationComponent;
  let fixture: ComponentFixture<TradePersonVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradePersonVerificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradePersonVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
