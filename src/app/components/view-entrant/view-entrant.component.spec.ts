import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewEntrantComponent } from './view-entrant.component';

describe('ViewEntrantComponent', () => {
  let component: ViewEntrantComponent;
  let fixture: ComponentFixture<ViewEntrantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewEntrantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewEntrantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
