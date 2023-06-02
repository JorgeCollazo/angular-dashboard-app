export class menuRolesRequest {
    consulta: string = '';
    usu_accion: number = 0;
    menu_id: number = 0;
    estado: number = 0;
    crear: number = 0;
    editar: number = 0;
    eliminar: number = 0;
    ver: number = 0;
    principal: number = 0;
    rol_id: number = 0;
    acc_menu_id: number = 0;
}

export class menuRoles {
    menu: string = '';
    nombre_rol: string = '';
    acc_menu_id: number = 0;
    rol_id: number = 0;
    estado: number = 0;
    crear: number = 0;
    editar: number = 0;
    eliminar: number = 0;
    ver: number = 0;
    principal: number = 0;
}

export class menuRoleDto {
    success: boolean = false;
    message: string = '';
    menuRol: menuRoles = new menuRoles();
    menuRoles: Array<menuRoles> = new Array<menuRoles>();
}