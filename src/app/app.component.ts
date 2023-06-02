import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BreadcrumbService } from 'xng-breadcrumb';
import { PGlobal } from './services/globales';
import { ConsumerService } from './services/http/consumer/consumer.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ICOM-APP';
  global = new PGlobal;
  host: any = {};

  constructor(private breadcrumbService: BreadcrumbService, private consumer: ConsumerService) {
    // this.breadcrumbService.breadcrumbs$
    this.host = window.location;
    if (environment.production) {
      // this.consultaConfig();
      sessionStorage.setItem('SRV', environment.SRV);
      this.global.SRV = environment.SRV;
      console.log("Global server: " + this.global.SRV);
      console.log("Host: " + this.host)
    }
  }

  async consultaConfig() {
    var consumerRpt = await this.consumer.GetConfig('http://jsonplaceholder.typicode.com/todos/1');
    console.log("Global server: " + this.global.SRV);
    console.log(consumerRpt);
    if (consumerRpt.success) {

      if (consumerRpt.data.api_externo_bool) {
        this.global.SRV = consumerRpt.data.api_externo;
      } else {
        // this.global.SRV = `${this.host.protocol}//${this.host.hostname}:${consumerRpt.data.puerto_api_local}/`;
      }
    }

  }
}
