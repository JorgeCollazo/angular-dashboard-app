import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ScannerComponent } from './scanner/scanner.component';
import { MobileRoutingModule } from './mobile-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
@NgModule({
  declarations: [
    ScannerComponent
  ],
  imports: [
    CommonModule,
    MobileRoutingModule,
    ZXingScannerModule,
  ]
})
export class MobileModule { }
