import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutTradesmenComponent } from './about-tradesmen.component';

describe('AboutTradesmenComponent', () => {
  let component: AboutTradesmenComponent;
  let fixture: ComponentFixture<AboutTradesmenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AboutTradesmenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AboutTradesmenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
