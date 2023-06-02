export class menuRequest {
    consulta: string = '';
    usu_accion: number = 0;
    nombre: string = '';
    status: number = 0;
    sw_admin: number = 0;
    descripcion: string = '';
    nivel: number = 0;
    link: string = '';
    sw_display: number = 0;
    id_menu: number = 0;
    orden: number = 0;
    padre: number = 0;
}

export class menu {
    id_menu: number = 0;
    nombre: string = '';
    link: string = '';
    status: number = 0;
    sw_display: number = 0;
    orden: number = 0
    descripcion: string = '';
    sw_admin: number = 0;
    nivel: number = 0;
    padre: number = 0;
}

export class MenuDto {
    success: boolean = false;
    message: string = '';
    menu: menu = new menu();
    menus: Array<menu> = new Array<menu>();
}