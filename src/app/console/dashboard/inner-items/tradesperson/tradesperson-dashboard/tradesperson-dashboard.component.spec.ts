import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradespersonDashboardComponent } from './tradesperson-dashboard.component';

describe('TradespersonDashboardComponent', () => {
  let component: TradespersonDashboardComponent;
  let fixture: ComponentFixture<TradespersonDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradespersonDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TradespersonDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
