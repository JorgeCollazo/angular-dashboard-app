import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScannerComponent } from './scanner/scanner.component';

const routes: Routes = [
  {
    path: 'scanner',
    data: { breadcrumb: 'Scanner' },
    component: ScannerComponent
  },
  {
    path: '',
    redirectTo: 'scanner',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule { }
