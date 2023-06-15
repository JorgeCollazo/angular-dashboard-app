import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-theme-switcher',
  templateUrl: './theme-switcher.component.html',
  styleUrls: ['./theme-switcher.component.css']
})
export class ThemeSwitcherComponent implements OnInit {

  isDarkThemeActive: boolean = false;

  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
  }

  onChange(newValue: boolean):void {
    if(newValue) {
      this.document.body.classList.add('dark-mode');
    } else {
      this.document.body.classList.remove('dark-mode');
    }
  }

}
