import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    year: Number;
    copyright: String;
    version: String;

  constructor() {
    this.year = new Date().getFullYear();
    this.copyright = `Copyright © Grupo Advisers ${this.year}`;
    this.version = 'v1.0.1';
  }

  ngOnInit(): void {
  }

}
