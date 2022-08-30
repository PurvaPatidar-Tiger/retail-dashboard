import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaChartAnimatedComponent } from './area-chart-animated.component';

describe('AreaChartComponent', () => {
  let component: AreaChartAnimatedComponent;
  let fixture: ComponentFixture<AreaChartAnimatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AreaChartAnimatedComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaChartAnimatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
