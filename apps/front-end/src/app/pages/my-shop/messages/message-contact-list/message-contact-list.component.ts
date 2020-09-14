import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'pelaguru-message-contact-list',
  templateUrl: './message-contact-list.component.html',
  styleUrls: ['./message-contact-list.component.scss'],
})
export class MessageContactListComponent implements OnInit {
  formController: FormGroup;
  constructor() {
    this.formController = new FormGroup({
      search: new FormControl(''),
    });
  }

  ngOnInit(): void {}
}
