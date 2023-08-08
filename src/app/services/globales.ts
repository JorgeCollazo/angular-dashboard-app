import { environment } from 'src/environments/environment';
import { Permisos, Usuario } from '../public/auth/auth.interface';
export class PGlobal {

    /* API para las consultas de la web */
    public get SRV(): any { return (environment.production) ? sessionStorage.getItem('SRV') : environment.SRV; }
    public set SRV(server: string) { sessionStorage.setItem('SRV', server); }


    /* Informacion del usuario logueado en la sesion */
    public get InfoUsr(): Usuario { return this.decrypParm((sessionStorage.getItem('_usuario')) ? sessionStorage.getItem('_usuario') : undefined); }
    public set InfoUsr(ifoUsuario: Usuario) { sessionStorage.setItem('_usuario', this.encrypParm(ifoUsuario)); }


    /* Token de autenticacion */
    public get Token(): any { return (sessionStorage.getItem('_token')) ? sessionStorage.getItem('_token') : undefined; }
    public set Token(token: string) { sessionStorage.setItem('_token', token); }


    /* Todo los permisos que devuelve el api en el login */
    public get InfoMenu(): Permisos[] { return this.decrypParm((sessionStorage.getItem('_menu')) ? sessionStorage.getItem('_menu') : undefined); }
    public set InfoMenu(menu: Permisos[]) { sessionStorage.setItem('_menu', this.encrypParm(menu)); }


    /* Permisos de la vista que se muestra en pantalla. */
    public get permisos(): Permisos { return this.decrypParm((sessionStorage.getItem('permisos')) ? sessionStorage.getItem('permisos') : undefined); }
    public set permisos(Datospermisos: Permisos) { sessionStorage.setItem('permisos', this.encrypParm(Datospermisos)); }


    /* Pasa un string a dato no legible por el usuario */
    public encrypParm(datos: any): string {
        return btoa(encodeURIComponent(JSON.stringify(datos)));
    }

    /* Pasa los datos no legisbles a Un string con sentido :) */
    public decrypParm(datos: any): any {
        if (datos == undefined) return '';
        return JSON.parse(decodeURIComponent(atob(datos)));
    }


    /* Configuracion de Tost de las vistas */
    public get optionsToast(): any { return { progressBar: true, progressAnimation: 'increasing', closeButton: true } };


    /* Borra todos los datos de la sesion */
    public salir() { sessionStorage.clear() };
}
