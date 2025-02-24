import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCardsContextComponent } from './profile-cards-context.component';

describe('ProfileCardsContextComponent', () => {
  let component: ProfileCardsContextComponent;
  let fixture: ComponentFixture<ProfileCardsContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileCardsContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileCardsContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
