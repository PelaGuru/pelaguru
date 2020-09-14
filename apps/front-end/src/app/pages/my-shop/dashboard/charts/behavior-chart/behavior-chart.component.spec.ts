import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorChartComponent } from './behavior-chart.component';

describe('BehaviorChartComponent', () => {
  let component: BehaviorChartComponent;
  let fixture: ComponentFixture<BehaviorChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BehaviorChartComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BehaviorChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
