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
    this.checkDarkThemeActive();
  }

  onChange(newValue: boolean):void {
    if(newValue) {
      this.document.body.classList.add('dark-mode');
      this.isDarkThemeActive = true;
    } else {
      this.document.body.classList.remove('dark-mode');
      this.isDarkThemeActive = false;
    }
  }

  checkDarkThemeActive(){
    if(this.document.body.classList.contains('dark-mode')) {
      this.isDarkThemeActive = true;
    } else {
      this.isDarkThemeActive = false;
    }
  }

}
