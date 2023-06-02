import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { PGlobal } from '../globales';
import alasql from 'alasql';
import { Permisos } from 'src/app/public/auth/auth.interface';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PermitionPageGuard implements CanActivate, CanActivateChild {
  global = new PGlobal;
  constructor(
    private router: Router,
    private toastr: ToastrService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let menu: Permisos = alasql("SELECT * FROM ? WHERE link = ?", [this.global.InfoMenu, route.url[0]['path']])[0];
      if (menu) {
        this.global.permisos = menu;
      }
        return true;
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let menu: Permisos = alasql("SELECT * FROM ? WHERE link = ?", [this.global.InfoMenu, childRoute.url[0]['path']])[0];
    if (menu) {
      this.global.permisos = menu;
      return true;
    } else {
      this.toastr.warning('No tiene permiso para obtener esta página del servidor.', 'Permisos de Vista', this.global.optionsToast);
      this.router.navigate(['/403']);
      return false;
    }
  }

}
