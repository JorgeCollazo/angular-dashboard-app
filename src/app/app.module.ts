import { enableProdMode, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CommonModule, HashLocationStrategy, LocationStrategy } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './public/auth/auth.component';
import { CambioContrasenaComponent } from './public/cambio-contrasena/cambio-contrasena.component';
import { Page404Component } from './public/page404/page404.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { BreadcrumbModule, BreadcrumbService } from 'xng-breadcrumb';
import { CompartidoModule } from './componentes/compartido.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthInterceptorService } from './services/http/auth-interceptor.service';
import { Page403Component } from './public/page403/page403.component';

import { MobileModule } from './pages/mobile/mobile.module';
import { ReportesModule } from './pages/reportes/reportes.module';
import { PwaService } from './services/pwa/pwa.service';

// import { MesaConteoModule } from './pages/mesa-conteo/mesa-conteo.module';
import { WebcamModule } from 'ngx-webcam';
import { Router } from '@angular/router';

// import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import {MatSidenavModule} from '@angular/material/sidenav';

//enableProdMode();

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AuthComponent,
    CambioContrasenaComponent,
    Page404Component,
    FooterComponent,
    Page403Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbModule,
    CompartidoModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    MobileModule,
    ReportesModule,
    // MesaConteoModule,
    WebcamModule,
    // SweetAlert2Module.forRoot(),
    MatButtonModule,
    MatIconModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatInputModule,
    CommonModule,
    MatSidenavModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    BreadcrumbService,
    PwaService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
