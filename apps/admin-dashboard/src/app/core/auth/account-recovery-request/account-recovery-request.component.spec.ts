import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountRecoveryRequestComponent } from './account-recovery-request.component';

describe('AccountRecoveryRequestComponent', () => {
  let component: AccountRecoveryRequestComponent;
  let fixture: ComponentFixture<AccountRecoveryRequestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountRecoveryRequestComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountRecoveryRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
