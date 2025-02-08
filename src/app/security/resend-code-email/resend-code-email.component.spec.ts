import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResendCodeEmailComponent } from './resend-code-email.component';

describe('ResendCodeEmailComponent', () => {
  let component: ResendCodeEmailComponent;
  let fixture: ComponentFixture<ResendCodeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResendCodeEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResendCodeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
