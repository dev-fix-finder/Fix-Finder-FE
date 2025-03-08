import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderTopBarComponent } from './main-header-top-bar.component';

describe('MainHeaderTopBarComponent', () => {
  let component: MainHeaderTopBarComponent;
  let fixture: ComponentFixture<MainHeaderTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeaderTopBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHeaderTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
