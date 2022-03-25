import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SongRequestWidgetComponent } from './song-request-widget.component';

describe('SongRequestWidgetComponent', () => {
  let component: SongRequestWidgetComponent;
  let fixture: ComponentFixture<SongRequestWidgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SongRequestWidgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SongRequestWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
