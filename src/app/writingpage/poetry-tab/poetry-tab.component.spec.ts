import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoetryTabComponent } from './poetry-tab.component';

describe('PoetryTabComponent', () => {
  let component: PoetryTabComponent;
  let fixture: ComponentFixture<PoetryTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoetryTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoetryTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
