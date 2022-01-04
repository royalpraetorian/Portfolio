import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayboxComponent } from './displaybox.component';

describe('DisplayboxComponent', () => {
  let component: DisplayboxComponent;
  let fixture: ComponentFixture<DisplayboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
