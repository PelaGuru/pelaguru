import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageContactListComponent } from './message-contact-list.component';

describe('MessageContactListComponent', () => {
  let component: MessageContactListComponent;
  let fixture: ComponentFixture<MessageContactListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MessageContactListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageContactListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
