import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WritingpageComponent } from './writingpage.component';

describe('WritingpageComponent', () => {
  let component: WritingpageComponent;
  let fixture: ComponentFixture<WritingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WritingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WritingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
