import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessContextComponent } from './process-context.component';

describe('ProcessContextComponent', () => {
  let component: ProcessContextComponent;
  let fixture: ComponentFixture<ProcessContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcessContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcessContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
