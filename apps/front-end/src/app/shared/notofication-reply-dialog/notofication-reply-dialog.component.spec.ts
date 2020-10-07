import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotoficationReplyDialogComponent } from './notofication-reply-dialog.component';

describe('NotoficationReplyDialogComponent', () => {
  let component: NotoficationReplyDialogComponent;
  let fixture: ComponentFixture<NotoficationReplyDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotoficationReplyDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotoficationReplyDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
