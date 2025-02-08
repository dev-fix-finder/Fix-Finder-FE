import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimetablePopoverComponent } from './timetable-popover.component';

describe('TimetablePopoverComponent', () => {
  let component: TimetablePopoverComponent;
  let fixture: ComponentFixture<TimetablePopoverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimetablePopoverComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimetablePopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
