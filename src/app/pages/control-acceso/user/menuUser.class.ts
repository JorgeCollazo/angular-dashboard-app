export class menuUserRequest {
    consulta: string = '';
    usu_accion: number = 0;
    menu_id: number = 0;
    estado: number = 0;
    crear: number = 0;
    editar: number = 0;
    eliminar: number = 0;
    ver: number = 0;
    principal: number = 0;
    usuario_id: number = 0;
    acc_menu_id: number = 0;
}

export class menuUser {
    menu: string = '';
    acc_menu_id: number = 0;
    estado: number = 0;
    crear: number = 0;
    editar: number = 0;
    eliminar: number = 0;
    ver: number = 0;
    principal: number = 0;
}

export class menuUserDto {
    success: boolean = false;
    message: string = '';
    menuUsuario: menuUser = new menuUser();
    menusUsuario: Array<menuUser> = new Array<menuUser>();
}