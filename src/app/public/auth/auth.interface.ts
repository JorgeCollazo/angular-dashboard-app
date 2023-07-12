export class Login {
    User: string = '';
    Pwd: string = '';
}

export class LoginDto {
    success: boolean = false;
    message: string = '';
    usuario: Usuario = new Usuario();
    token: string = '';
    permisos: Permisos[] = [];
}


export class Usuario {
    nivel: number = 0;
    idempresa: number = 0;
    nombre: string = '';
    nombreRol: string = '';
    rol_id: number = 0;
    status: number = 0;
    sw_admin: number = 0;
    sw_change_pass: number = 0;
    usuario_id: number = 0;
}

export class Permisos {
    idmenu: Number = 0;
    estado: Number = 0;
    crear: Number = 0;
    editar: Number = 0;
    eliminar: Number = 0;
    ver: Number = 0;
    principal: Number = 0;
    menu: string = '';
    link: string = '';
    orden: Number = 0;
    muestra: Number = 0;
}
