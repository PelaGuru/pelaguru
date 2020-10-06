import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiseasManagementComponent } from './diseas-management.component';

describe('DiseasManagementComponent', () => {
  let component: DiseasManagementComponent;
  let fixture: ComponentFixture<DiseasManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DiseasManagementComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiseasManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
