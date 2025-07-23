import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueStatsComponent } from './revenue-stats.component';

describe('RevenueStatsComponent', () => {
  let component: RevenueStatsComponent;
  let fixture: ComponentFixture<RevenueStatsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueStatsComponent]
    });
    fixture = TestBed.createComponent(RevenueStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
