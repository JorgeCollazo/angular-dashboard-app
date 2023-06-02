import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compania-list',
  templateUrl: './compania-list.component.html',
  styleUrls: ['./compania-list.component.css']
})
export class CompaniaListComponent implements OnInit {

  loadingPage: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadingPage = true;
    setTimeout(() => {
      this.loadingPage = false;
    }, 500);
  }

  btnAdd($event: any): void {
    this.router.navigate(['./app/pages/compania/form']);
  }

  btnModify(): void {

  }

  btnDelete(): void {

  }

  modify(): void {

  }

  delete(): void {

  }

}
