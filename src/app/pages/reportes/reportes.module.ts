import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RptPremioinstComponent } from './rpt-premioinst/rpt-premioinst.component';
import { CompartidoModule } from 'src/app/componentes/compartido.module';
import { ReportesRoutingModule } from './reportes-routing.module';
import { ExcelService } from 'src/app/services/exportFile/excel.service';


@NgModule({
  declarations: [
    RptPremioinstComponent
  ],
  imports: [
    CommonModule,
    ReportesRoutingModule,
    CompartidoModule,
  ],
  providers: [
    ExcelService
  ]
})
export class ReportesModule { }
