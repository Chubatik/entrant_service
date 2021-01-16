import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntrantComponent } from './add-entrant.component';

describe('AddEntrantComponent', () => {
  let component: AddEntrantComponent;
  let fixture: ComponentFixture<AddEntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
