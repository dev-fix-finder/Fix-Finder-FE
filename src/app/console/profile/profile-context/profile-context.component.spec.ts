import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileContextComponent } from './profile-context.component';

describe('ProfileContextComponent', () => {
  let component: ProfileContextComponent;
  let fixture: ComponentFixture<ProfileContextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileContextComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileContextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
