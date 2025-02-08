import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyForgetPasswordComponent } from './verify-forget-password.component';

describe('VerifyForgetPasswordComponent', () => {
  let component: VerifyForgetPasswordComponent;
  let fixture: ComponentFixture<VerifyForgetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyForgetPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyForgetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
