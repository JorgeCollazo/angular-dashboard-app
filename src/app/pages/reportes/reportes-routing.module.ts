import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RptPremioinstComponent } from './rpt-premioinst/rpt-premioinst.component';

const routes: Routes = [
  {
    path: 'rpt-premioinst',
    data: { breadcrumb: 'rpt-premioinst' },
    component: RptPremioinstComponent
  },
  {
    path: '',
    redirectTo: 'rpt-premioinst',
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
export class ReportesRoutingModule { }
