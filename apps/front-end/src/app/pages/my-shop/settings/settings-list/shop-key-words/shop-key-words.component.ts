import { Component, OnInit } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

export interface KeywordData {
  label: string;
}

@Component({
  selector: 'pelaguru-shop-key-words',
  templateUrl: './shop-key-words.component.html',
  styleUrls: ['./shop-key-words.component.scss']
})
export class ShopKeyWordsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  keywords: Array<KeywordData> = [
    { label: 'Keyword 1' },
    { label: 'Keyword 2' },
    { label: 'Keyword 3' }
  ];

  constructor() {}

  ngOnInit(): void {}

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our keyword
    if ((value || '').trim()) {
      this.keywords.push({ label: value.trim() });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(keyword: KeywordData): void {
    const index = this.keywords.indexOf(keyword);

    if (index >= 0) {
      this.keywords.splice(index, 1);
    }
  }
}
