import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
@Injectable({
  providedIn: 'root'
})
export class PwaService {
  constructor(private swUpdate: SwUpdate) { 
    if(this.swUpdate.isEnabled) {
       swUpdate.available.subscribe(event => {
         if(confirm("New version available. Load New Version?")) {
           window.location.reload();
         }
      });
    }
  }
}
