import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksTabComponent } from './books-tab.component';

describe('BooksTabComponent', () => {
  let component: BooksTabComponent;
  let fixture: ComponentFixture<BooksTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BooksTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
