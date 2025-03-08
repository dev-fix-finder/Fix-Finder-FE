import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainHeaderNavBarComponent } from './main-header-nav-bar.component';

describe('MainHeaderNavBarComponent', () => {
  let component: MainHeaderNavBarComponent;
  let fixture: ComponentFixture<MainHeaderNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainHeaderNavBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainHeaderNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
