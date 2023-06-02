import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreadcrumbResolveService  implements Resolve<any> {
  
  constructor(private _http: HttpClient) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any>| Promise<any> | any {

    const subcategoryId: string | null = route.paramMap.get("subcategoryId");
    // other route params are in route.paramMap


    // return this._http.get("url");
    return of({
      name: 'Item ' + 1
    });
  }
} 
