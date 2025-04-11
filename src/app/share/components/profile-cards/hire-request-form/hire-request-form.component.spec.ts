import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HireRequestFormComponent } from './hire-request-form.component';

describe('HireRequestFormComponent', () => {
  let component: HireRequestFormComponent;
  let fixture: ComponentFixture<HireRequestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HireRequestFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HireRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
