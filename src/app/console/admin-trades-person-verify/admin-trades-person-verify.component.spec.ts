import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTradesPersonVerifyComponent } from './admin-trades-person-verify.component';

describe('AdminTradesPersonVerifyComponent', () => {
  let component: AdminTradesPersonVerifyComponent;
  let fixture: ComponentFixture<AdminTradesPersonVerifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTradesPersonVerifyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTradesPersonVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
