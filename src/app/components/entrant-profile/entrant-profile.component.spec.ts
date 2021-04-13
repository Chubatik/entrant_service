import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrantProfileComponent } from './entrant-profile.component';

describe('EntrantProfileComponent', () => {
  let component: EntrantProfileComponent;
  let fixture: ComponentFixture<EntrantProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntrantProfileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntrantProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
