import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingstatsComponent } from './bookingstats.component';

describe('BookingstatsComponent', () => {
  let component: BookingstatsComponent;
  let fixture: ComponentFixture<BookingstatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingstatsComponent]
    });
    fixture = TestBed.createComponent(BookingstatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
